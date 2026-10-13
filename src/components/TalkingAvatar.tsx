import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Phase = "walking" | "waving" | "talking" | "done";

const WALK_MS = 3600;
const WAVE_MS = 900;
const TYPE_MS = 28;
const LINE_HOLD_MS = 1800;
const DISMISS_KEY = "kj-avatar-dismissed";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
};

const readDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const writeDismissed = (value: boolean) => {
  try {
    if (value) sessionStorage.setItem(DISMISS_KEY, "1");
    else sessionStorage.removeItem(DISMISS_KEY);
  } catch {
    // Storage can be blocked (private mode); the avatar still works without it.
  }
};

/** Kevin's illustrated portrait. Hops while walking, waves on arrival, nods while talking, breathes when idle. */
const Character = ({ walking, waving, talking }: { walking: boolean; waving: boolean; talking: boolean }) => (
  <div
    className={cn(
      "avatar-figure relative w-full h-full",
      walking ? "is-walking" : talking ? "is-talking" : "is-idle",
    )}
  >
    <img
      src="/kevin-avatar.webp"
      alt=""
      width={400}
      height={391}
      draggable={false}
      className="avatar-portrait absolute inset-x-0 bottom-0 w-full h-auto select-none"
    />
    {waving && (
      <span className="avatar-wave absolute -top-1 -left-3 text-2xl md:text-3xl" aria-hidden="true">
        👋
      </span>
    )}
  </div>
);

export const TalkingAvatar = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const lines = [t("avatar.line1"), t("avatar.line2"), t("avatar.line3"), t("avatar.line4"), t("avatar.line5")];

  const [visible, setVisible] = useState(() => !readDismissed());
  const [phase, setPhase] = useState<Phase>(reduceMotion ? "talking" : "walking");
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [voiceOn, setVoiceOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voiceSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const line = lines[lineIdx] ?? "";
  const isLast = lineIdx === lines.length - 1;

  // Walk in, wave, then start talking.
  useEffect(() => {
    if (!visible || phase === "talking" || phase === "done") return;
    const next = phase === "walking" ? "waving" : "talking";
    const id = window.setTimeout(() => setPhase(next), phase === "walking" ? WALK_MS : WAVE_MS);
    return () => window.clearTimeout(id);
  }, [phase, visible]);

  // Typewriter for the current line.
  useEffect(() => {
    if (phase !== "talking") return;
    setTyped("");
    // Split by code point so emoji are never cut in half mid-type.
    const chars = Array.from(line);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(chars.slice(0, i).join(""));
      if (i >= chars.length) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [phase, line]);

  // Advance lines: on speech end when voice is on, otherwise after the line finishes typing.
  useEffect(() => {
    if (phase !== "talking") return;
    let cancelled = false;
    const advance = () => {
      if (cancelled) return;
      if (isLast) setPhase("done");
      else setLineIdx((i) => i + 1);
    };

    if (voiceOn && voiceSupported) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(line.replace(/[\u{1F300}-\u{1FAFF}]/gu, ""));
      const voice = synth.getVoices().find((v) => /en[-_](IN|GB|US)/i.test(v.lang));
      if (voice) u.voice = voice;
      u.rate = 1.02;
      u.onstart = () => setSpeaking(true);
      u.onend = () => {
        setSpeaking(false);
        window.setTimeout(advance, 350);
      };
      u.onerror = () => {
        setSpeaking(false);
        advance();
      };
      synth.speak(u);
      return () => {
        cancelled = true;
        synth.cancel();
        setSpeaking(false);
      };
    }

    const id = window.setTimeout(advance, line.length * TYPE_MS + LINE_HOLD_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [phase, line, isLast, voiceOn, voiceSupported]);

  useEffect(() => () => {
    if (voiceSupported) window.speechSynthesis.cancel();
  }, [voiceSupported]);

  const replay = useCallback(() => {
    setLineIdx(0);
    setPhase("talking");
  }, []);

  const toggleVoice = () => {
    if (voiceOn) {
      setVoiceOn(false);
      return;
    }
    setVoiceOn(true);
    // Voice was off: restart from the top so the visitor hears the whole intro.
    if (phase === "done" || lineIdx > 0) replay();
  };

  const dismiss = () => {
    setVoiceOn(false);
    writeDismissed(true);
    setVisible(false);
  };

  const reopen = () => {
    writeDismissed(false);
    setLineIdx(0);
    setPhase(reduceMotion ? "talking" : "walking");
    setVisible(true);
  };

  const isSpeaking = phase === "talking" && (voiceOn ? speaking : typed.length < line.length);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.aside
            key="avatar"
            className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-40 flex items-end gap-2 pointer-events-none"
            initial={reduceMotion ? { opacity: 0 } : { x: "-100vw" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: 160, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } }}
            transition={{ duration: WALK_MS / 1000, ease: [0.2, 0, 0.4, 1] }}
            aria-label="Kevin's introduction"
          >
            {/* Speech bubble */}
            <AnimatePresence>
              {(phase === "talking" || phase === "done") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  style={{ transformOrigin: "bottom right" }}
                  className="pointer-events-auto relative mb-16 md:mb-24 w-[min(68vw,300px)] surface-card p-4 shadow-2xl shadow-black/50"
                >
                  <button
                    onClick={dismiss}
                    className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5"
                    aria-label={t("avatar.close")}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="mb-2 pr-6">
                    <div className="leading-tight">
                      <div className="text-xs font-semibold text-foreground">Kevin Jojo</div>
                      <div className="text-[10px] text-muted-foreground">{t("hero.role1")}</div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground leading-relaxed min-h-[3.5em]" aria-live="polite">
                    {phase === "done" ? line : typed}
                    {phase === "talking" && typed.length < line.length && <span className="caret">&nbsp;</span>}
                  </p>

                  {phase === "done" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => scrollTo("projects")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        {t("hero.cta.work")} <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => scrollTo("book")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-primary/40 px-3 py-1.5 text-xs font-medium hover:bg-primary/10"
                      >
                        <Calendar className="w-3.5 h-3.5" /> {t("hero.cta.book")}
                      </button>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex gap-1" aria-hidden="true">
                      {lines.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            i === lineIdx ? "w-4 bg-primary" : i < lineIdx ? "w-1.5 bg-primary/50" : "w-1.5 bg-white/10",
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {phase === "done" && (
                        <button
                          onClick={replay}
                          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-1.5 py-1"
                        >
                          <RotateCcw className="w-3 h-3" /> {t("avatar.replay")}
                        </button>
                      )}
                      {voiceSupported && (
                        <button
                          onClick={toggleVoice}
                          className={cn(
                            "inline-flex items-center gap-1 text-[11px] px-1.5 py-1 rounded",
                            voiceOn ? "text-primary" : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {voiceOn ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          {voiceOn ? t("avatar.mute") : t("avatar.listen")}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bubble tail */}
                  <span className="absolute -right-1.5 bottom-6 w-3 h-3 rotate-45 bg-card border-r border-b border-white/[0.06]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Character */}
            <div className="w-[112px] h-[110px] md:w-[156px] md:h-[152px] shrink-0">
              <Character walking={phase === "walking"} waving={phase === "waving"} talking={isSpeaking} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!visible && (
        <button
          onClick={reopen}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-black/40 hover:scale-105 transition-transform"
          aria-label={t("avatar.reopen")}
          title={t("avatar.reopen")}
        >
          👋
        </button>
      )}
    </>
  );
};
