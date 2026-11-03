import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

export const useResumeDownload = () => {
  const { t } = useTranslation();

  const handleResumeDownload = () => {
    const resumeUrl = "/Kevin_Jojo_Resume.pdf";

    try {
      // Track in GA4
      if (typeof window !== "undefined" && (window as AnalyticsWindow).gtag) {
        (window as AnalyticsWindow).gtag("event", "file_download", {
          event_category: "Resume",
          event_label: "Resume Download",
        });
      }

      const link = document.createElement("a");
      link.href = resumeUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t("contact.success"));
    } catch {
      toast.error(t("contact.error"));
    }
  };

  return handleResumeDownload;
};
