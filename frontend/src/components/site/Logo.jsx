export const LogoMark = ({ size = 28, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="7" fill={dark ? "#F8FAFC" : "#0F172A"} />
    <path d="M22.5 8.5H9.5V15.5H14" fill="none" stroke={dark ? "#0F172A" : "#F8FAFC"} strokeWidth="3.2" strokeLinecap="square" />
    <path d="M9.5 23.5H22.5V16.5H18" fill="none" stroke={dark ? "#0D5940" : "#34D399"} strokeWidth="3.2" strokeLinecap="square" />
  </svg>
);

export const Logo = ({ dark = false }) => (
  <span className="inline-flex items-center gap-2.5" data-testid="site-logo">
    <LogoMark dark={dark} />
    <span className={`font-display text-[1.15rem] font-bold tracking-tight ${dark ? "text-white" : "text-[#111418]"}`}>
      sinnovation
    </span>
  </span>
);
