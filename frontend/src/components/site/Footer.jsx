import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";

const Col = ({ title, links }) => (
  <div>
    <p className="eyebrow !text-[#8A8F98] mb-4">{title}</p>
    <ul className="space-y-2.5">
      {links.map(([to, label]) => (
        <li key={to}><Link to={to} className="text-sm text-slate-300 hover:text-white transition-colors" data-testid={`footer-link-${to.replace(/\//g, "-").slice(1) || "home"}`}>{label}</Link></li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="bg-[#0C0E12] text-slate-300" data-testid="site-footer">
    <div className="container-x py-16 grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-5">
        <Logo dark />
        <p className="text-sm leading-relaxed text-slate-400 max-w-xs">{SITE.promise} White-label delivery for agencies in {SITE.markets}.</p>
        <a href={`mailto:${SITE.email}`} className="text-sm text-white link-underline" data-testid="footer-email">{SITE.email}</a>
        <p className="text-sm text-slate-500">{SITE.location}</p>
      </div>
      <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
        <Col title="Services" links={[...SERVICES.slice(0, 5).map((s) => [`/services/${s.slug}`, s.name]), ["/services", "All nine services"]]} />
        <Col title="Company" links={[["/work", "Work"], ["/pricing", "Partner pricing"], ["/how-it-works", "How it works"], ["/about", "About"], ["/faq", "FAQ"], ["/partner", "Become a partner"]]} />
        <Col title="Trust" links={[["/confidentiality", "Confidentiality & NDA"], ["/privacy", "Privacy"], ["/terms", "Terms"], ["/inbox", "Team sign in"]]} />
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container-x py-6 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
        <span>&copy; {new Date().getFullYear()} Sinnovation. All rights reserved.</span>
        <span className="font-num">sinnovation.si</span>
      </div>
    </div>
  </footer>
);
