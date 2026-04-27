import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SITE_URL = "https://portfolio-palette-95.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export const SEOHead = ({
  title = "Kevin Jojo - AI Engineer & Product-Focused Builder",
  description = "AI Engineer specializing in designing and deploying intelligent systems that solve real-world business problems. Explore projects, blogs, and live AI demos.",
  keywords = "Kevin Jojo, AI Engineer, Machine Learning Engineer, LLM Developer, Generative AI, Python, Portfolio, Data Science, MLOps",
  image = DEFAULT_IMAGE,
  url = SITE_URL,
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
