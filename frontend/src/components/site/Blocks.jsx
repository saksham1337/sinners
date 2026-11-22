import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const PageHero = ({ eyebrow, title, lead, children, testid = "page-hero" }) => (
  <section className="relative border-b border-border hairline-grid" data-testid={testid}>
    <div className="container-x pt-20 pb-16 lg:pt-28 lg:pb-20">
      <p className="eyebrow reveal">{eyebrow}</p>
      <h1 className="reveal mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111418]" style={{ animationDelay: "80ms" }}>{title}</h1>
      {lead && <p className="reveal mt-6 max-w-2xl text-base sm:text-lg text-[#575B62] leading-relaxed" style={{ animationDelay: "160ms" }}>{lead}</p>}
      {children && <div className="reveal mt-9" style={{ animationDelay: "240ms" }}>{children}</div>}
    </div>
  </section>
);

export const SectionHead = ({ eyebrow, title, lead, action }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#111418]">{title}</h2>
      {lead && <p className="mt-4 text-base md:text-lg text-[#575B62] leading-relaxed">{lead}</p>}
    </div>
    {action}
  </div>
);

export const PrimaryBtn = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid}
    className="group inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0D5940]">
    {children}
    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
  </Link>
);

export const GhostBtn = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid}
    className="inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-6 py-3.5 text-sm font-medium text-[#111418] transition-colors duration-200 hover:border-[#111418]">
    {children}
  </Link>
);

export const TextLink = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid} className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#111418]">
    <span className="link-underline">{children}</span>
    <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </Link>
);

export const Stat = ({ value, label, testid }) => (
  <div className="border-l border-[#111418] pl-4" data-testid={testid}>
    <div className="font-num text-3xl lg:text-4xl font-medium text-[#111418]">{value}</div>
    <div className="mt-2 text-xs sm:text-sm text-[#575B62] leading-snug">{label}</div>
  </div>
);

export const CtaBand = ({ title = "Add a delivery team without adding headcount.", lead = "Start with a discovery call and a small pilot. You keep the client, the brand and the margin." }) => (
  <section className="bg-[#0F172A] text-white" data-testid="cta-band">
    <div className="container-x py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <p className="eyebrow !text-[#34D399]">Work with us</p>
        <h2 className="mt-4 text-3xl lg:text-5xl font-semibold text-white">{title}</h2>
        <p className="mt-5 max-w-xl text-slate-300 leading-relaxed">{lead}</p>
      </div>
      <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
        <Link to="/partner" data-testid="cta-band-partner" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#34D399]">
          Become a partner <ArrowRight size={16} />
        </Link>
        <Link to="/pricing#rate-card" data-testid="cta-band-rate-card" className="inline-flex items-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white">
          Request the rate card
        </Link>
      </div>
    </div>
  </section>
);
