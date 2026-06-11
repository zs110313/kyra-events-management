import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { whatsappUrl } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <Button href={whatsappUrl(site.phone)} rel="noreferrer" target="_blank" variant="secondary">
      WhatsApp
      <MessageCircle aria-hidden className="ml-3" size={17} />
    </Button>
  );
}
