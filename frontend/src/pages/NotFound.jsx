import { Seo } from "@/components/site/Seo";
import { PrimaryBtn, GhostBtn } from "@/components/site/Blocks";

export default function NotFound() {
  return (
    <section className="hairline-grid border-b border-border" data-testid="not-found-page">
      <Seo title="Page not found" description="This page does not exist." path="/404" />
      <meta name="robots" content="noindex" />
      <div className="container-x py-28 lg:py-40">
        <p className="font-num text-7xl lg:text-9xl font-medium text-[#111418]">404</p>
        <h1 className="mt-6 text-3xl lg:text-4xl font-semibold text-[#111418]">This page isn't here.</h1>
        <p className="mt-4 max-w-md text-[#575B62]">The link may be old or mistyped. Everything else is where you would expect it.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <PrimaryBtn to="/" testid="not-found-home">Back to home</PrimaryBtn>
          <GhostBtn to="/services" testid="not-found-services">See services</GhostBtn>
        </div>
      </div>
    </section>
  );
}
