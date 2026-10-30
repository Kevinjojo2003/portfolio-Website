import { Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AvatarNarrationButton = () => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      data-avatar-narration-button
      onClick={(event) => {
        const card = event.currentTarget.closest<HTMLElement>("[data-narrate]");
        if (!card) return;
        window.dispatchEvent(new CustomEvent("avatar:narrate", { detail: card }));
      }}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-primary/25 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
      {t("avatar.hearAbout")}
    </button>
  );
};
