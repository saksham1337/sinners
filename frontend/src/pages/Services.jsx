import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/site/Seo";
import { PageHero, CtaBand } from "@/components/site/Blocks";
import { PILLARS } from "@/data/site";
import { servicesByPillar } from "@/data/services";

export default function Services() {
  return (
    <>
      <Seo title="White Label Services for Agencies" path="/services"
        description="White label web development, software, AI chatbots, AI voice agents, PPC, SEO, social media, video editing and graphic design for agencies." />
      <PageHero eyebrow="Services" title="Everything your clients ask for. Delivered under your name."
        lead="Nine services across three pillars. Sell one, or sell them together. Every deliverable ships white-label." />
      {PILLARS.map((p, i) => (
        <section key={p.key} className="border-b border-border" data-testid={`services-pillar-${p.key}`}>
          <div className="container-x py-16 lg:py-20 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="font-num text-sm text-[#8A8F98]">0{i + 1}</span>
              <h2 className="mt-3 text-4xl font-bold text-[#111418]">{p.label}</h2>
              <p className="mt-3 text-[#575B62] leading-relaxed max-w-xs">{p.line}</p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {servicesByPillar(p.key).map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} data-testid={`service-card-${s.slug}`}
                  className="group border border-border bg-white p-7 transition-colors duration-200 hover:border-[#111418]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-[#111418]">{s.name}</h3>
                    <ArrowUpRight size={18} className="shrink-0 text-[#8A8F98] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0D5940]" />
                  </div>
                  <p className="mt-3 text-sm text-[#575B62] leading-relaxed">{s.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
