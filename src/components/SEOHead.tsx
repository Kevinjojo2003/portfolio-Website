import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const SEOHead = ({
  title = "Kevin Jojo - AI Engineer & Product-Focused Builder",
  description = "AI Engineer specializing in designing and deploying intelligent systems that solve real-world business problems.",
  keywords = "Kevin Jojo, AI Engineer, Machine Learning, LLM, Portfolio"
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
