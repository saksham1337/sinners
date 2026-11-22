import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/Blocks";
import { SITE } from "@/data/site";

const Doc = ({ sections, notice }) => (
  <section className="section">
    <div className="container-x max-w-3xl">
      {notice && <p className="mb-12 border border-[#CBD5E1] bg-[#EEF2F6] p-4 text-sm text-[#0F172A]" data-testid="legal-template-notice">{notice}</p>}
      <div className="space-y-10">
        {sections.map(([h, body]) => (
          <div key={h}>
            <h2 className="text-xl font-semibold text-[#111418]">{h}</h2>
            <p className="mt-3 text-[#575B62] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TEMPLATE = "This is a starter template pending legal review. It will be updated before it is treated as a final legal document.";

export const Confidentiality = () => (
  <>
    <Seo title="Confidentiality and NDA" path="/confidentiality" description="How Sinnovation protects your agency and your clients: NDAs, white-label deliverables, file ownership and no client contact." />
    <PageHero eyebrow="Confidentiality & NDA" title="Your clients stay your clients." lead="Here is how we protect your agency, in plain language." />
    <Doc sections={[
      ["We sign an NDA first", "Before you share any client name, brief, login or file, we sign an NDA. You can use your agency's NDA or ask us to send ours. Tick the NDA box on the partner form and we will send it with our first reply."],
      ["Our name stays out of the work", "Deliverables carry no Sinnovation branding. That includes files, file metadata, code, emails and reports. Work can be branded in your agency's identity if you prefer."],
      ["We never contact your clients", "We only speak with your clients if you ask us to, and then as part of your team."],
      ["You own everything", "All work, source files and account setups belong to your agency and are handed over in full."],
      ["We never sell to your clients", "We do not pitch, approach or take on your clients directly, during or after our work together."],
      ["Questions", `Email ${SITE.email} and we will answer any confidentiality question before you share anything.`],
    ]} />
  </>
);

export const Privacy = () => (
  <>
    <Seo title="Privacy Policy" path="/privacy" description="How Sinnovation handles the information agencies share through this website." />
    <PageHero eyebrow="Privacy" title="Privacy policy" />
    <Doc notice={TEMPLATE} sections={[
      ["What we collect", "When you submit a form, we collect the details you enter: your name, agency name, website, email, country, the services you are interested in, your approximate volume and any message."],
      ["How we use it", "We use these details only to reply to your enquiry, send a rate card or NDA you asked for, and discuss working together."],
      ["Who sees it", "Only the Sinnovation team. We do not sell or share your details with anyone else."],
      ["How long we keep it", "We keep enquiry details for as long as needed to respond and manage a working relationship, or until you ask us to delete them."],
      ["Your choices", `You can ask to see, correct or delete your details at any time by emailing ${SITE.email}.`],
    ]} />
  </>
);

export const Terms = () => (
  <>
    <Seo title="Terms of Use" path="/terms" description="Terms of use for the Sinnovation website." />
    <PageHero eyebrow="Terms" title="Terms of use" />
    <Doc notice={TEMPLATE} sections={[
      ["About this website", "This website describes Sinnovation's white-label services for agencies. Nothing on it is a binding offer. Each engagement is covered by its own written agreement."],
      ["Case studies", "Case study figures come from real accounts and are shown without client names. Past results do not guarantee future results."],
      ["Pricing", "Prices are provided through a partner rate card and confirmed in each written scope."],
      ["Intellectual property", "The content and design of this website belong to Sinnovation. Work we deliver for partners belongs to the partner, as set out in each agreement."],
      ["Contact", `Questions about these terms can be sent to ${SITE.email}.`],
    ]} />
  </>
);
