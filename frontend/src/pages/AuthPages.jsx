import { Link } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/react";
import { Logo } from "@/components/site/Logo";

const Shell = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#F4F4F2]">
    <title>Team sign in | Sinnovation</title>
    <meta name="robots" content="noindex" />
    <div className="container-x h-16 flex items-center"><Link to="/" data-testid="auth-home-link"><Logo /></Link></div>
    <div className="flex-1 flex items-center justify-center px-4 py-10">{children}</div>
  </div>
);

export const SignInPage = () => (
  <Shell><SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" withSignUp fallbackRedirectUrl="/inbox" /></Shell>
);

export const SignUpPage = () => (
  <Shell><SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/inbox" /></Shell>
);
