import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Seo } from "@/components/site/Seo";
import { PrimaryBtn, GhostBtn, SectionHead, Stat, TextLink, CtaBand } from "@/components/site/Blocks";
import { CaseCard } from "@/components/site/CaseCard";
import { FaqList } from "@/components/site/FaqList";
import { SITE, GUARANTEES, PILLARS, STEPS, MODELS, FAQ_GROUPS, STATS } from "@/data/site";
import { servicesByPillar } from "@/data/services";
import { CASE_STUDIES } from "@/data/caseStudies";
import { priceFor } from "@/data/pricing";

const Hero = () => (
  <section className="relative border-b border-border hairline-grid overflow-hidden" data-testid="home-hero">
    <div className="container-x pt-20 pb-16 lg:pt-32 lg:pb-24 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8">
        <p className="eyebrow reveal">White-label delivery for agencies in Canada and the USA</p>
        <h1 className="reveal mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold text-[#111418] leading-[1.02]" style={{ animationDelay: "80ms" }} data-testid="home-hero-title">
          Your brand.<br />Our team.<br /><span className="text-[#0D5940]">Delivered on time.</span>
        </h1>
        <p className="reveal mt-8 max-w-xl text-base sm:text-lg text-[#575B62] leading-relaxed" style={{ animationDelay: "160ms" }}>
          Sell web, AI, ads, SEO and content to your clients. Our Bangalore team delivers it behind the scenes. You keep the client relationship and the margin.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
          <PrimaryBtn to="/partner" testid="hero-partner-cta">Become a partner</PrimaryBtn>
          <GhostBtn to="/work" testid="hero-work-cta">See the results</GhostBtn>
        </div>
      </div>
      <div className="lg:col-span-4 lg:pt-6">
        <div className="reveal border border-border bg-white p-7 space-y-8" style={{ animationDelay: "320ms" }} data-testid="hero-stats">
          {STATS.map((s, i) => <Stat key={s.label} {...s} testid={`hero-stat-${i}`} />)}
        </div>
      </div>
    </div>
  </section>
);

const Pillars = () => (
  <section className="section" data-testid="home-pillars">
    <div className="container-x">
      <SectionHead eyebrow="What we deliver" title="Nine services. Three pillars. One partner." action={<TextLink to="/services" testid="pillars-all-services">All services</TextLink>} />
      <div className="grid lg:grid-cols-3 border-t border-l border-border">
        {PILLARS.map((p, i) => (
          <div key={p.key} className="border-r border-b border-border bg-white p-8 lg:p-10" data-testid={`pillar-${p.key}`}>
            <span className="font-num text-sm text-[#8A8F98]">0{i + 1}</span>
            <h3 className="mt-6 text-3xl font-bold text-[#111418]">{p.label}</h3>
            <p className="mt-3 text-[#575B62] leading-relaxed">{p.line}</p>
            <ul className="mt-8 space-y-1">
              {servicesByPillar(p.key).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="group flex items-center justify-between border-t border-border py-3 text-sm text-[#111418] hover:text-[#0D5940] transition-colors" data-testid={`pillar-service-${s.slug}`}>
                    {s.name}<ArrowUpRight size={15} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Guarantees = () => (
  <section className="section bg-[#0F172A] text-white" data-testid="home-guarantees">
    <div className="container-x">
      <p className="eyebrow !text-[#34D399]">The white-label guarantees</p>
      <h2 className="mt-4 max-w-2xl text-3xl lg:text-4xl font-semibold text-white">Your clients see your agency. Only your agency.</h2>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
        {GUARANTEES.map((g, i) => (
          <div key={g.title} className="bg-[#0F172A] p-8" data-testid={`guarantee-${i}`}>
            <Check size={18} className="text-[#34D399]" />
            <h3 className="mt-5 text-lg font-semibold text-white">{g.title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{g.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowShort = () => (
  <section className="section border-b border-border" data-testid="home-how">
    <div className="container-x">
      <SectionHead eyebrow="How it works" title="From first call to steady delivery." action={<TextLink to="/how-it-works" testid="how-full-process">The full process</TextLink>} />
      <ol className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8">
        {STEPS.map((s, i) => (
          <li key={s.title} className="border-t-2 border-[#111418] pt-5" data-testid={`home-step-${i}`}>
            <span className="font-num text-xs text-[#8A8F98]">Step {i + 1}</span>
            <h3 className="mt-2 text-base font-semibold text-[#111418]">{s.title}</h3>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const Models = () => (
  <section className="section" data-testid="home-models">
    <div className="container-x">
      <SectionHead eyebrow="Engagement models" title="Buy delivery the way you sell it." action={<TextLink to="/pricing" testid="models-pricing-link">Partner pricing</TextLink>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {MODELS.map((m) => (
          <div key={m.key} className="border border-border bg-white p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1" data-testid={`home-model-${m.key}`}>
            <h3 className="text-xl font-semibold text-[#111418]">{m.name}</h3>
            <p className="mt-2 text-sm text-[#575B62] leading-relaxed flex-1">{m.line}</p>
            <p className="mt-8 font-num text-xs text-[#0D5940]">{priceFor(m.key)}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Proof = () => (
  <section className="section bg-[#F4F4F2] border-y border-border" data-testid="home-proof">
    <div className="container-x">
      <SectionHead eyebrow="Real results, anonymized" title="We keep our clients' names private. Yours too." lead="Every number below comes from real accounts we have delivered. No money figures, no client names." action={<TextLink to="/work" testid="proof-all-work">All case studies</TextLink>} />
      <div className="grid lg:grid-cols-2 gap-5">
        {CASE_STUDIES.filter((c) => c.type === "results").map((c) => <CaseCard key={c.id} c={c} compact />)}
      </div>
    </div>
  </section>
);

const FaqTeaser = () => (
  <section className="section" data-testid="home-faq">
    <div className="container-x grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#111418]">What agencies ask first.</h2>
        <div className="mt-6"><TextLink to="/faq" testid="faq-teaser-all">Read every answer</TextLink></div>
      </div>
      <div className="lg:col-span-8">
        <FaqList prefix="home-faq" items={[FAQ_GROUPS[0].items[0], FAQ_GROUPS[0].items[1], FAQ_GROUPS[3].items[0], FAQ_GROUPS[1].items[3]]} />
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Seo title="Sinnovation | White Label Agency Delivery Partner" path="/"
        description={`White-label web, AI, paid ads, SEO and content delivery for digital agencies in ${SITE.markets}. Your brand. Our team. Delivered on time.`} />
      <Hero /><Pillars /><Guarantees /><HowShort /><Models /><Proof /><FaqTeaser /><CtaBand />
    </>
  );
}
