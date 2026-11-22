import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/data/site";

const linkCls = ({ isActive }) =>
  `text-sm transition-colors duration-200 ${isActive ? "text-[#111418] font-medium" : "text-[#575B62] hover:text-[#111418]"}`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#FBFBFA]/85 backdrop-blur-xl" data-testid="site-header">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" data-testid="header-logo-link"><Logo /></Link>
        <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls} data-testid={`nav-${n.to.slice(1)}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/partner" data-testid="header-partner-cta"
            className="hidden sm:inline-flex items-center rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0D5940]">
            Become a partner
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu" data-testid="mobile-menu-toggle">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-[#FBFBFA] px-5 py-4 flex flex-col gap-4" data-testid="mobile-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls} data-testid={`mobile-nav-${n.to.slice(1)}`}>{n.label}</NavLink>
          ))}
          <Link to="/partner" className="text-sm font-medium text-[#0D5940]" data-testid="mobile-nav-partner">Become a partner</Link>
        </nav>
      )}
    </header>
  );
};
