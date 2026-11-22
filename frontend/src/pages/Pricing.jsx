import { Seo } from "@/components/site/Seo";
import { PageHero, SectionHead } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { MODELS } from "@/data/site";
import { priceFor } from "@/data/pricing";
import { useHashScroll } from "./Work";

export default function Pricing() {
  useHashScroll();
  return (
    <>
      <Seo title="White Label Partner Pricing" path="/pricing"
        description="Four ways for agencies to buy white-label delivery: per project, monthly per client, dedicated team or a pilot project. Request the partner rate card." />
      <PageHero eyebrow="Partner pricing" title="Clear rates you can mark up."
        lead="Prices depend on the service, the scope and your monthly volume. Partners get a rate card with clear numbers, so you always know your margin before you quote." />
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Engagement models" title="Four ways to work with us." />
          <div className="grid md:grid-cols-2 gap-5">
            {MODELS.map((m, i) => (
              <div key={m.key} className="border border-border bg-white p-8 lg:p-10" data-testid={`pricing-model-${m.key}`}>
                <span className="font-num text-sm text-[#8A8F98]">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold text-[#111418]">{m.name}</h3>
                <p className="mt-1 text-[#111418]">{m.line}</p>
                <p className="mt-4 text-sm text-[#575B62] leading-relaxed">{m.body}</p>
                <div className="mt-7 border-t border-border pt-5">
                  <p className="eyebrow !text-[#8A8F98] mb-3">Suits</p>
                  <div className="flex flex-wrap gap-2">
                    {m.fits.map((f) => <span key={f} className="rounded-full bg-[#F4F4F2] px-3 py-1 text-xs text-[#575B62]">{f}</span>)}
                  </div>
                </div>
                <p className="mt-6 font-num text-sm text-[#0D5940]" data-testid={`pricing-price-${m.key}`}>{priceFor(m.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="rate-card" className="section scroll-mt-16 bg-[#F4F4F2] border-t border-border" data-testid="rate-card-section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Rate card</p>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#111418]">Get the partner rate card.</h2>
            <p className="mt-4 text-[#575B62] leading-relaxed">Tell us what you sell and roughly how much. We will email you the rates that apply to your agency.</p>
          </div>
          <div className="lg:col-span-8 border border-border bg-white p-7 lg:p-10">
            <EnquiryForm type="rate_card" />
          </div>
        </div>
      </section>
    </>
  );
}
