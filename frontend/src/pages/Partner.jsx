import { Check } from "lucide-react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE } from "@/data/site";

const NEXT = ["We reply by email to set up a discovery call.", "If you ask for an NDA, we send it before any client details are shared.", "We agree a small pilot project so you can judge the work."];

export default function Partner() {
  return (
    <>
      <Seo title="Become a White Label Partner" path="/partner"
        description="Tell us about your agency and the services you sell. Sinnovation delivers web, AI, ads, SEO and content under your brand." />
      <PageHero eyebrow="Become a partner" title="Tell us about your agency." lead="A few details help us come to the first call prepared. Nothing you share here is passed to anyone else." />
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-10">
            <div>
              <p className="eyebrow">What happens next</p>
              <ol className="mt-5 space-y-5">
                {NEXT.map((n, i) => (
                  <li key={n} className="flex gap-4 text-sm text-[#111418] leading-relaxed">
                    <span className="font-num text-[#0D5940]">0{i + 1}</span>{n}
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-border pt-8 space-y-3">
              {["NDA before any project", "Our name never reaches your client", "You own all work and files"].map((x) => (
                <p key={x} className="flex gap-3 text-sm text-[#575B62]"><Check size={16} className="text-[#0D5940] mt-0.5" />{x}</p>
              ))}
            </div>
            <p className="text-sm text-[#575B62]">Prefer email? <a href={`mailto:${SITE.email}`} className="text-[#111418] link-underline" data-testid="partner-email-link">{SITE.email}</a></p>
          </aside>
          <div className="lg:col-span-8 border border-border bg-white p-7 lg:p-10">
            <EnquiryForm type="partner" />
          </div>
        </div>
      </section>
    </>
  );
}
