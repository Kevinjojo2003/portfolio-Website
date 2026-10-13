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

// Palette sampled from Kevin's headshot: warm brown skin, black hair and beard, navy blazer, white shirt.
const SKIN = "#B0734D";
const SKIN_SHADE = "#965E3D";
const HAIR = "#141414";
const BLAZER = "#1F2A44";
const BLAZER_SHADE = "#18213A";
const TROUSERS = "#1C2333";

/** Illustrated Kevin. `walking` swings limbs, `waving` raises the right arm, `talking` moves the mouth. */
const Character = ({ walking, waving, talking }: { walking: boolean; waving: boolean; talking: boolean }) => (
  <svg
    viewBox="0 0 120 220"
    className={cn("avatar-figure w-full h-full overflow-visible", walking && "is-walking", talking && "is-talking")}
    aria-hidden="true"
  >
    {/* Ground shadow */}
    <ellipse cx="60" cy="214" rx="32" ry="5" fill="rgb(0 0 0 / 0.35)" />

    <g className="avatar-body">
      {/* Legs */}
      <g className="avatar-leg-back" style={{ transformOrigin: "52px 134px" }}>
        <rect x="44" y="130" width="15" height="64" rx="6" fill={TROUSERS} />
        <path d="M39 194 Q39 188 46 188 L58 188 Q62 188 62 194 L62 199 L39 199 Z" fill="#5A3A28" stroke="#2A1A12" strokeWidth="1" />
      </g>
      <g className="avatar-leg-front" style={{ transformOrigin: "68px 134px" }}>
        <rect x="61" y="130" width="15" height="64" rx="6" fill="#232B3D" />
        <path d="M58 194 Q58 188 64 188 L76 188 Q81 188 81 194 L81 199 L58 199 Z" fill="#5A3A28" stroke="#2A1A12" strokeWidth="1" />
      </g>

      {/* Left arm */}
      <g className="avatar-arm-back" style={{ transformOrigin: "35px 82px" }}>
        <rect x="28" y="76" width="14" height="54" rx="7" fill={BLAZER_SHADE} />
        <rect x="29" y="122" width="12" height="5" rx="2" fill="#F1F5F9" />
        <circle cx="35" cy="132" r="6.5" fill={SKIN_SHADE} />
      </g>
      {/* Right arm (waves on arrival) */}
      <g className={cn("avatar-arm-front", waving && "is-waving")} style={{ transformOrigin: "85px 82px" }}>
        <rect x="78" y="76" width="14" height="54" rx="7" fill={BLAZER_SHADE} />
        <rect x="79" y="122" width="12" height="5" rx="2" fill="#F1F5F9" />
        <circle cx="85" cy="132" r="6.5" fill={SKIN} />
      </g>

      {/* Torso: white shirt under a navy blazer */}
      <path d="M37 86 C37 75 46 68 60 68 C74 68 83 75 83 86 L81 138 C81 140 79 142 77 142 L43 142 C41 142 39 140 39 138 Z" fill={BLAZER} />
      <path d="M50 69 L60 69 L70 69 L66 108 L60 112 L54 108 Z" fill="#F8FAFC" />
      {/* Collar */}
      <path d="M51 69 L57 79 L60 72 L63 79 L69 69" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" strokeLinejoin="round" />
      {/* Lapels */}
      <path d="M49 70 L56 86 L52 90 L60 114 L44 84 Z" fill={BLAZER_SHADE} />
      <path d="M71 70 L64 86 L68 90 L60 114 L76 84 Z" fill={BLAZER_SHADE} />
      <circle cx="60" cy="96" r="1.1" fill="#CBD5E1" />
      <circle cx="60" cy="122" r="1.6" fill="#0F172A" />
      <line x1="68" y1="118" x2="77" y2="117" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="56" width="14" height="15" rx="5" fill={SKIN_SHADE} />

      {/* Head */}
      <g className="avatar-head" style={{ transformOrigin: "60px 60px" }}>
        {/* Ears */}
        <ellipse cx="38.5" cy="38" rx="4" ry="6" fill={SKIN_SHADE} />
        <ellipse cx="81.5" cy="38" rx="4" ry="6" fill={SKIN_SHADE} />
        {/* Face */}
        <path d="M39 32 C39 17 49 12 60 12 C71 12 81 17 81 32 L81 42 C81 56 71 64 60 64 C49 64 39 56 39 42 Z" fill={SKIN} />
        {/* Full beard along the jaw */}
        <path
          d="M39 38 C40 46 42 52 46 56 C50 61 55 64 60 64 C65 64 70 61 74 56 C78 52 80 46 81 38 L79 40 C77 46 74 50 70 51 C66 51 63 50.5 60 50.5 C57 50.5 54 51 50 51 C46 50 43 46 41 40 Z"
          fill={HAIR}
        />
        {/* Moustache */}
        <path d="M50 47.5 C53 44.5 57 44.5 60 46 C63 44.5 67 44.5 70 47.5 C66 48.5 63 48 60 47.6 C57 48 54 48.5 50 47.5 Z" fill={HAIR} />
        {/* Thick, tousled hair */}
        <path
          d="M36 35 C32 24 35 13 43 8 C46 3 53 1 59 3 C64 0 72 1 76 5 C82 7 87 14 86 22 C87 28 85 32 83 36 C82 30 80 26 77 24 C74 27 70 27 67 24 C64 27 59 27 56 24 C53 27 48 27 45 24 C42 26 40 30 39 35 Z"
          fill={HAIR}
        />
        <path d="M44 10 C47 6 52 6 55 8 M60 5 C64 3 69 4 72 7 M47 16 C51 13 56 13 59 15" stroke="#2A2A2A" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        {/* Brows */}
        <path d="M45.5 30 Q50 27.5 55 29.5" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M65 29.5 Q70 27.5 74.5 30" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* Eyes (blink) */}
        <g className="avatar-eyes" style={{ transformOrigin: "60px 35px" }}>
          <ellipse cx="50.5" cy="35" rx="2.5" ry="2.7" fill="#140D09" />
          <ellipse cx="69.5" cy="35" rx="2.5" ry="2.7" fill="#140D09" />
          <circle cx="51.3" cy="34.2" r="0.7" fill="#fff" />
          <circle cx="70.3" cy="34.2" r="0.7" fill="#fff" />
        </g>
        {/* Nose */}
        <path d="M60 36 Q57.5 42 59 43.5 Q60.5 44.2 62 43.4" stroke={SKIN_SHADE} strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* Mouth: toothy smile when idle, opens while talking */}
        <path d="M53.5 50 Q60 55.5 66.5 50 Z" fill="#F8FAFC" stroke="#5B2A1C" strokeWidth="1.2" strokeLinejoin="round" className="avatar-smile" />
        <ellipse cx="60" cy="51.5" rx="5" ry="3.4" fill="#4A1F14" className="avatar-mouth" style={{ transformOrigin: "60px 50px" }} />
      </g>
    </g>
  </svg>
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

  const mouthMoving = phase === "talking" && (voiceOn ? speaking : typed.length < line.length);

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
                  className="pointer-events-auto relative mb-24 md:mb-32 w-[min(78vw,300px)] surface-card p-4 shadow-2xl shadow-black/50"
                >
                  <button
                    onClick={dismiss}
                    className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5"
                    aria-label={t("avatar.close")}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2.5 mb-2.5 pr-6">
                    <img
                      src="/kevin-jojo-face.webp"
                      alt="Kevin Jojo"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
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
            <div className="w-[72px] h-[132px] md:w-[96px] md:h-[176px] shrink-0">
              <Character walking={phase === "walking"} waving={phase === "waving"} talking={mouthMoving} />
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
