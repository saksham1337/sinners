import { SITE } from "@/data/site";

// React 19 hoists these tags into <head>.
export const Seo = ({ title, description, path = "/" }) => {
  const full = path === "/" ? title : `${title} | Sinnovation`;
  const url = `${SITE.domain}${path === "/" ? "" : path}`;
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
    </>
  );
};
