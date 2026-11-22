import { Seo } from "@/components/site/Seo";
import { PageHero, CtaBand } from "@/components/site/Blocks";
import { STEPS } from "@/data/site";

const PILLARS = [
  { title: "Communication", points: ["We work inside your project tools and messaging channels.", "One point of contact for every account.", "Working hours and time-zone overlap are agreed during onboarding.", "Response times are agreed during onboarding, based on your volume."] },
  { title: "Quality", points: ["Every deliverable is checked internally before it reaches you.", "Your brand rules and client preferences are documented at the start.", "Revision rounds are set in each scope.", "Regular reviews to keep standards where you want them."] },
  { title: "Confidentiality", points: ["NDA signed before any project starts.", "Our name never appears in deliverables, files or emails.", "We never contact your clients unless you ask.", "All work and files belong to your agency."] },
];

export default function HowItWorks() {
  return (
    <>
      <Seo title="How White Label Delivery Works" path="/how-it-works"
        description="How agencies start working with Sinnovation: discovery call, NDA, pilot project, shared tools, ongoing delivery and regular reviews." />
      <PageHero eyebrow="How it works" title="Six steps from first call to steady delivery."
        lead="You stay in front of the client. We work behind you, inside your tools, under your name." />
      <section className="section">
        <div className="container-x">
          <ol className="relative border-l border-[#111418] ml-3 lg:ml-0 lg:border-l-0 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative pl-8 pb-12 lg:pl-0 lg:pb-0 lg:border-t-2 lg:border-[#111418] lg:pt-6" data-testid={`how-step-${i}`}>
                <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 bg-[#0D5940] lg:hidden" />
                <span className="font-num text-sm text-[#0D5940]">Step 0{i + 1}</span>
                <h2 className="mt-2 text-2xl font-semibold text-[#111418]">{s.title}</h2>
                <p className="mt-3 text-[#575B62] leading-relaxed max-w-sm">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section bg-[#F4F4F2] border-t border-border">
        <div className="container-x grid lg:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <div key={p.title} className="border border-border bg-white p-8" data-testid={`how-commitment-${p.title.toLowerCase()}`}>
              <h2 className="text-xl font-semibold text-[#111418]">{p.title}</h2>
              <ul className="mt-6 space-y-4">
                {p.points.map((x) => <li key={x} className="flex gap-3 text-sm text-[#575B62] leading-relaxed"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0D5940]" />{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
