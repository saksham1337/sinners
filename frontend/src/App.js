import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ClerkAuthProvider from "@/components/auth/ClerkAuthProvider";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Work from "@/pages/Work";
import Pricing from "@/pages/Pricing";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Faq from "@/pages/Faq";
import Partner from "@/pages/Partner";
import NotFound from "@/pages/NotFound";
import Inbox from "@/pages/Inbox";
import { Confidentiality, Privacy, Terms } from "@/pages/Legal";
import { SignInPage, SignUpPage } from "@/pages/AuthPages";

const AuthArea = () => <ClerkAuthProvider><Outlet /></ClerkAuthProvider>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/confidentiality" element={<Confidentiality />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthArea />}>
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
