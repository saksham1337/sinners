import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Seo } from "@/components/site/Seo";
import { PageHero, PrimaryBtn, GhostBtn, CtaBand, Stat, TextLink } from "@/components/site/Blocks";
import { FaqList } from "@/components/site/FaqList";
import { SERVICES } from "@/data/services";
import { caseById } from "@/data/caseStudies";
import { MODELS } from "@/data/site";
import { ON_REQUEST } from "@/data/pricing";
import NotFound from "./NotFound";

const Block = ({ title, children, testid }) => (
  <div className="border-t border-border py-10 grid lg:grid-cols-12 gap-6" data-testid={testid}>
    <h2 className="lg:col-span-4 text-xl font-semibold text-[#111418]">{title}</h2>
    <div className="lg:col-span-8">{children}</div>
  </div>
);

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return <NotFound />;
  const proof = s.proof && caseById(s.proof);
  const models = MODELS.filter((m) => m.fits.includes(s.name) || m.key === "pilotProject");

  return (
    <>
      <Seo title={s.seoTitle} description={s.seoDesc} path={`/services/${s.slug}`} />
      <PageHero eyebrow={`Service / ${s.pillar}`} title={s.name} lead={s.short} testid="service-hero">
        <div className="flex flex-wrap gap-3">
          <PrimaryBtn to="/partner" testid="service-partner-cta">Become a partner</PrimaryBtn>
          <GhostBtn to="/pricing#rate-card" testid="service-rate-card-cta">Request the rate card</GhostBtn>
        </div>
      </PageHero>
      <section className="container-x py-10" data-testid={`service-detail-${s.slug}`}>
        <Block title="What's included" testid="service-included">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {s.included.map((x) => <li key={x} className="flex gap-3 text-[#111418] text-sm sm:text-base"><Check size={18} className="mt-0.5 shrink-0 text-[#0D5940]" />{x}</li>)}
          </ul>
        </Block>
        <Block title="How you resell it" testid="service-resell">
          <p className="text-[#575B62] leading-relaxed max-w-2xl">{s.resell}</p>
        </Block>
        <Block title="Delivery flow" testid="service-flow">
          <ol className="grid sm:grid-cols-5 gap-5">
            {s.flow.map((f, i) => (
              <li key={f} className="border-t-2 border-[#111418] pt-4">
                <span className="font-num text-xs text-[#8A8F98]">0{i + 1}</span>
                <p className="mt-2 text-sm text-[#111418] leading-snug">{f}</p>
              </li>
            ))}
          </ol>
        </Block>
        <Block title="Turnaround and pricing" testid="service-terms">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="border border-border bg-white p-6">
              <p className="eyebrow !text-[#8A8F98]">Turnaround</p>
              <p className="mt-3 text-[#111418]" data-testid="service-turnaround">{s.turnaround}</p>
            </div>
            <div className="border border-border bg-white p-6">
              <p className="eyebrow !text-[#8A8F98]">Pricing</p>
              <p className="mt-3 text-[#111418]" data-testid="service-pricing">{ON_REQUEST}</p>
              <p className="mt-2 text-sm text-[#575B62]">Usually bought as: {models.map((m) => m.name).join(", ")}.</p>
            </div>
          </div>
        </Block>
        {proof && (
          <Block title="Proof from real work" testid="service-proof">
            <p className="text-sm text-[#575B62]">{proof.industry} / {proof.markets}</p>
            <p className="mt-2 text-lg font-semibold text-[#111418]">{proof.title}</p>
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {proof.stats.slice(0, 4).map((st, i) => <Stat key={st.label} {...st} testid={`service-proof-stat-${i}`} />)}
            </div>
            <div className="mt-6"><TextLink to={`/work#${proof.id}`} testid="service-proof-link">Read the case study</TextLink></div>
          </Block>
        )}
        <Block title="Questions" testid="service-faq">
          <FaqList items={s.faq} prefix="service-faq" />
        </Block>
        <div className="border-t border-border pt-10 pb-6">
          <p className="eyebrow !text-[#8A8F98] mb-4">Other services</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
              <Link key={x.slug} to={`/services/${x.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm text-[#575B62] hover:border-[#111418] hover:text-[#111418] transition-colors" data-testid={`other-service-${x.slug}`}>{x.name}</Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
