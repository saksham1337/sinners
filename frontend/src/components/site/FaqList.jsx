import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FaqList = ({ items, prefix = "faq" }) => (
  <Accordion type="single" collapsible className="border-t border-border" data-testid={`${prefix}-accordion`}>
    {items.map((f, i) => (
      <AccordionItem key={f.q} value={`${prefix}-${i}`} className="border-border">
        <AccordionTrigger className="text-left font-display text-base lg:text-lg font-medium text-[#111418] hover:no-underline py-5" data-testid={`${prefix}-trigger-${i}`}>
          {f.q}
        </AccordionTrigger>
        <AccordionContent className="text-[#575B62] text-sm sm:text-base leading-relaxed pb-6 max-w-3xl">{f.a}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
