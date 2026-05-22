import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const SITE_URL = "https://portfolio-palette-95.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export const SEOHead = ({
  title = "Kevin Jojo - AI Engineer & Product-Focused Builder",
  description = "AI Engineer specializing in designing and deploying intelligent systems that solve real-world business problems. Explore projects, blogs, and live AI demos.",
  keywords = "Kevin Jojo, AI Engineer, Machine Learning Engineer, LLM Developer, Generative AI, Python, Portfolio, Data Science, MLOps",
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  imageWidth = 1200,
  imageHeight = 630,
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kevin Jojo Portfolio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content="Kevin Jojo - AI Engineer Portfolio" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kevinjojo" />
      <meta name="twitter:creator" content="@kevinjojo" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Kevin Jojo - AI Engineer Portfolio" />
    </Helmet>
  );
};
