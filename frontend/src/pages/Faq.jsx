import { Seo } from "@/components/site/Seo";
import { PageHero, CtaBand } from "@/components/site/Blocks";
import { FaqList } from "@/components/site/FaqList";
import { FAQ_GROUPS } from "@/data/site";

export default function Faq() {
  return (
    <>
      <Seo title="White Label Agency Partner FAQ" path="/faq"
        description="Answers for agencies about white-label delivery with Sinnovation: confidentiality, NDAs, working together, quality, billing and services." />
      <PageHero eyebrow="FAQ" title="Straight answers for agency owners." />
      <section className="section">
        <div className="container-x space-y-16">
          {FAQ_GROUPS.map((g, i) => (
            <div key={g.group} className="grid lg:grid-cols-12 gap-8" data-testid={`faq-group-${i}`}>
              <h2 className="lg:col-span-4 text-xl lg:text-2xl font-semibold text-[#111418]">{g.group}</h2>
              <div className="lg:col-span-8"><FaqList items={g.items} prefix={`faq-${i}`} /></div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
