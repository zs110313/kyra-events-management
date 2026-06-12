import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"]);
const textExtensions = new Set([...sourceExtensions, ".json", ".md", ".css", ".html", ".svg"]);
const allowedEnvFiles = new Set([".env.example"]);

function trackedFiles() {
  return execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);
}

function readTrackedTextFile(file: string) {
  return readFileSync(join(root, file), "utf8");
}

function isTextFile(file: string) {
  return textExtensions.has(extname(file));
}

function isSourceFile(file: string) {
  return sourceExtensions.has(extname(file));
}

describe("security baseline", () => {
  const files = trackedFiles();

  it("does not commit local environment files", () => {
    const committedEnvFiles = files.filter((file) => {
      const name = file.replace(/\\/g, "/").split("/").at(-1) ?? "";
      return name.startsWith(".env") && !allowedEnvFiles.has(name);
    });

    expect(committedEnvFiles).toEqual([]);
  });

  it("does not contain obvious hardcoded private credentials", () => {
    const secretPatterns = [
      /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
      /\bAKIA[0-9A-Z]{16}\b/,
      /\bgh[pousr]_[A-Za-z0-9_]{36,}\b/,
      /\bAIza[0-9A-Za-z_-]{35}\b/,
      /\bxox[baprs]-[0-9A-Za-z-]{20,}\b/,
      /\b(?:sk_live|sk_test)_[A-Za-z0-9]{16,}\b/,
      /\b(?:api[_-]?key|secret|token|password|private[_-]?key)\s*[:=]\s*["'`][^"'`\s]{8,}["'`]/i
    ];

    const matches = files
      .filter(isTextFile)
      .flatMap((file) => {
        const content = readTrackedTextFile(file);
        return secretPatterns
          .filter((pattern) => pattern.test(content))
          .map((pattern) => `${file} matched ${pattern.source}`);
      });

    expect(matches).toEqual([]);
  });

  it("does not use dangerous raw HTML rendering or string execution", () => {
    const dangerousTerms = [
      "dangerouslySet" + "InnerHTML",
      ".inner" + "HTML",
      "eval(",
      "new " + "Function("
    ];

    const matches = files
      .filter(isSourceFile)
      .filter((file) => file !== "test/security-baseline.test.ts")
      .flatMap((file) => {
        const content = readTrackedTextFile(file);
        return dangerousTerms.filter((term) => content.includes(term)).map((term) => `${file} contains ${term}`);
      });

    expect(matches).toEqual([]);
  });

  it("uses noopener and noreferrer on links that open a new tab", () => {
    const targetBlankTags = files
      .filter(isSourceFile)
      .flatMap((file) => {
        const content = readTrackedTextFile(file);
        return Array.from(content.matchAll(/<[\w.]+[\s\S]*?target=["']_blank["'][\s\S]*?>/g)).map((match) => ({
          file,
          tag: match[0]
        }));
      });

    const unsafeLinks = targetBlankTags.filter(({ tag }) => {
      const rel = tag.match(/\brel=["']([^"']*)["']/)?.[1] ?? "";
      const relValues = rel.split(/\s+/);
      return !relValues.includes("noopener") || !relValues.includes("noreferrer");
    });

    expect(unsafeLinks).toEqual([]);
  });

  it("keeps the contact form as a client-side mailto flow without embedded credentials", () => {
    const contactFormPath = "components/contact/ContactForm.tsx";

    expect(existsSync(join(root, contactFormPath))).toBe(true);

    const content = readTrackedTextFile(contactFormPath);
    const forbiddenTerms = [
      "fetch(",
      "axios.",
      "localStorage",
      "sessionStorage",
      "apiKey",
      "api_key",
      "secret",
      "token",
      "password"
    ];

    expect(content).toContain("mailto:");
    expect(forbiddenTerms.filter((term) => content.includes(term))).toEqual([]);
  });
});
