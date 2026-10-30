import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/**
 * Kevin walks in along the bottom edge of the page (the screen edge hides everything below his
 * chest), waves, and introduces himself with lip-synced clips in his cloned voice. Afterwards,
 * hovering over a marked card or activating its narration button makes him walk over and say the
 * matching `narrate.<id>` line.
 *
 * Clips are transparent video: HEVC-with-alpha .mov for Safari, VP9-alpha .webm elsewhere. They
 * are pre-rendered for English only; other languages fall back to the browser voice over the still.
 */

type Phase = "walk" | "sneak" | "wave" | "talk" | "idle";

interface Clip {
  /** Text shown in the speech bubble. */
  text: string;
  /** Matching cloned-voice audio. */
  audio?: string;
}

const WALK_PX_PER_SECOND = 420;
const TYPE_MS = 28;
const LINE_HOLD_MS = 1800;
const NARRATE_DWELL_MS = 450;
const BUBBLE_LINGER_MS = 4000;
const BUBBLE_WIDTH = 300;
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

const figureWidth = () => (window.innerWidth < 768 ? 112 : 210);
const restX = () => window.innerWidth - figureWidth() - (window.innerWidth < 768 ? 8 : 32);
const clampX = (x: number) => Math.min(Math.max(x, 8), window.innerWidth - figureWidth() - 8);

// Browser speech for languages without pre-rendered clips.
const speakWithBrowser = (text: string, lang: string, onEnd: () => void) => {
  if (!("speechSynthesis" in window)) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}]/gu, ""));
  u.lang = lang;
  u.rate = 0.98;
  u.onend = onEnd;
  u.onerror = onEnd;
  synth.speak(u);
  return true;
};

export const TalkingAvatar = () => {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const english = (i18n.resolvedLanguage ?? i18n.language ?? "en").startsWith("en");

  const introClips: Clip[] = [1, 2, 3, 4, 5].map((n) => ({
    text: t(`avatar.line${n}`),
    audio: english ? `/voice/line${n}.m4a` : undefined,
  }));
  const narrationClip = (id: string): Clip => ({
    text: t(`narrate.${id}`),
    audio: english ? `/voice/narrate/${id}.m4a` : undefined,
  });

  const [visible, setVisible] = useState(() => !readDismissed());
  const [phase, setPhase] = useState<Phase>("walk");
  const [x, setX] = useState<number | null>(null);
  const [walkSeconds, setWalkSeconds] = useState(0);
  const [queue, setQueue] = useState<Clip[]>([]);
  const [clipIdx, setClipIdx] = useState(0);
  const [isIntro, setIsIntro] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [voiceOn, setVoiceOn] = useState(false);
  const [reaction, setReaction] = useState<"wave" | "sneak" | null>(null);
  // Which side of him the bubble goes during hover narration (null: toward the page's middle).
  const [bubbleSide, setBubbleSide] = useState<"left" | "right" | null>(null);
  const [runId, setRunId] = useState(0);

  const avatarRef = useRef<HTMLElement | null>(null);
  const cursorNearAvatar = useRef(false);
  const lastReactionAt = useRef(0);
  const reactionTimers = useRef<number[]>([]);
  const afterWalk = useRef<() => void>(() => {});

  const clip = phase === "talk" ? queue[clipIdx] : undefined;
  const lastClip = queue[queue.length - 1];

  /** Walk (with the bob) from `from` (default: where he stands) to `targetX`, then run `next`. */
  const walkTo = useCallback(
    (targetX: number, next: () => void, from = x ?? window.innerWidth + 20, gait: "walk" | "sneak" = "walk") => {
      const distance = Math.abs(targetX - from);
      if (reduceMotion || distance < 12) {
        setX(targetX);
        next();
        return;
      }
      afterWalk.current = next;
      setWalkSeconds(Math.max(0.6, distance / WALK_PX_PER_SECOND));
      setPhase(gait);
      setX(targetX);
    },
    [x, reduceMotion],
  );

  const play = useCallback((clips: Clip[], intro: boolean) => {
    setQueue(clips);
    setClipIdx(0);
    setIsIntro(intro);
    setBubbleOpen(true);
    setPhase("talk");
  }, []);

  // The sprite sheet supplies the wave animation now; keep the greeting sequence timed to it.
  useEffect(() => {
    if (phase !== "wave") return;
    const id = window.setTimeout(() => play(introClips, true), 900);
    return () => window.clearTimeout(id);
    // introClips intentionally captures the selected language when the wave starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, play, i18n.language]);

  const startIntro = useCallback(() => {
    walkTo(
      restX(),
      () => {
        if (reduceMotion) play(introClips, true);
        else setPhase("wave");
      },
      -figureWidth() - 20,
    );
    // introClips is rebuilt each render; the intro only needs the texts of the moment it starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkTo, play, reduceMotion, english]);

  // Walk in once on mount (and on each replay / reopen).
  useEffect(() => {
    if (!visible) return;
    setX(null);
    setIntroDone(false);
    setBubbleOpen(false);
    setBubbleSide(null);
    const id = window.requestAnimationFrame(() => startIntro());
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, runId]);

  // Keep him on screen when the window resizes.
  useEffect(() => {
    const onResize = () => setX((cur) => (cur === null ? cur : clampX(cur)));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Playful reactions when a desktop visitor brings the pointer near the resting avatar.
  useEffect(() => {
    if (!visible || !introDone || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onPointerMove = (event: PointerEvent) => {
      const rect = avatarRef.current?.getBoundingClientRect();
      if (!rect || phase !== "idle" || bubbleOpen) return;
      const padding = 72;
      const near = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;
      if (!near) {
        cursorNearAvatar.current = false;
        return;
      }
      if (cursorNearAvatar.current || Date.now() - lastReactionAt.current < 2800) return;

      cursorNearAvatar.current = true;
      lastReactionAt.current = Date.now();
      setReaction("wave");
      reactionTimers.current.forEach(window.clearTimeout);
      reactionTimers.current = [
        window.setTimeout(() => setReaction("sneak"), 700),
        window.setTimeout(() => setReaction(null), 1550),
      ];
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      reactionTimers.current.forEach(window.clearTimeout);
      reactionTimers.current = [];
    };
  }, [visible, introDone, phase, bubbleOpen]);

  // Typewriter for the current line.
  useEffect(() => {
    if (!clip) return;
    setTyped("");
    const chars = Array.from(clip.text);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(chars.slice(0, i).join(""));
      if (i >= chars.length) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [clip]);

  // Play the current clip: lip-synced video (muted) plus the voice track when voice is on.
  useEffect(() => {
    if (phase !== "talk" || !clip) return;
    let finished = false;
    const timers: number[] = [];
    const audio = voiceOn && clip.audio ? new Audio(clip.audio) : null;

    const next = () => {
      if (finished) return;
      finished = true;
      if (clipIdx < queue.length - 1) {
        timers.push(window.setTimeout(() => setClipIdx((i) => i + 1), 300));
        return;
      }
      setPhase("idle");
      if (isIntro) setIntroDone(true);
      else timers.push(window.setTimeout(() => setBubbleOpen(false), BUBBLE_LINGER_MS));
    };
    const byTextLength = () => timers.push(window.setTimeout(next, clip.text.length * TYPE_MS + LINE_HOLD_MS));

    if (audio) {
      audio.onerror = byTextLength;
      audio.onended = next;
      audio.play().catch(byTextLength);
    } else {
      if (!(voiceOn && speakWithBrowser(clip.text, i18n.language, () => timers.push(window.setTimeout(next, 300))))) {
        byTextLength();
      }
    }

    return () => {
      finished = true;
      timers.forEach((id) => window.clearTimeout(id));
      audio?.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [phase, clip, clipIdx, queue.length, isIntro, voiceOn, i18n.language]);

  // Desktop hover and explicit narration buttons share the same card narration behavior.
  useEffect(() => {
    if (!visible || !introDone) return;
    const narrate = (el: Element | null) => {
      const id = el?.getAttribute("data-narrate");
      if (!el || !id || !i18n.exists(`narrate.${id}`)) return;
      const rect = el.getBoundingClientRect();
      const standRight = rect.right + figureWidth() + 16 <= window.innerWidth;
      const side = standRight ? rect.right + 16 : rect.left - figureWidth() - 16;
      setBubbleOpen(false);
      // Keep the bubble away from the card being explained.
      setBubbleSide(standRight ? "right" : "left");
      walkTo(clampX(side), () => play([narrationClip(id)], false), undefined, "sneak");
    };

    const onNarrateRequest = (event: Event) => {
      setVoiceOn(true);
      narrate((event as CustomEvent<Element>).detail);
    };
    window.addEventListener("avatar:narrate", onNarrateRequest);

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return () => window.removeEventListener("avatar:narrate", onNarrateRequest);
    }

    let timer = 0;
    let current: Element | null = null;

    const onOver = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest?.("[data-avatar-narration-button]")) {
        current = null;
        window.clearTimeout(timer);
        return;
      }
      const el = (e.target as Element | null)?.closest?.("[data-narrate]") ?? null;
      if (el === current) return;
      current = el;
      window.clearTimeout(timer);
      if (!el) return;
      timer = window.setTimeout(() => {
        narrate(el);
      }, NARRATE_DWELL_MS);
    };

    document.addEventListener("pointerover", onOver);
    return () => {
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("avatar:narrate", onNarrateRequest);
      window.clearTimeout(timer);
    };
    // narrationClip only reads t(); walkTo/play are stable enough for a hover handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, introDone, walkTo, play, i18n]);

  const replay = () => {
    setRunId((n) => n + 1);
  };

  const toggleVoice = () => {
    const turningOn = !voiceOn;
    setVoiceOn(turningOn);
    // Turning the voice on after the intro: hear it from the top.
    if (turningOn && introDone && phase === "idle") {
      setBubbleSide(null);
      play(introClips, true);
    }
  };

  const dismiss = () => {
    setVoiceOn(false);
    writeDismissed(true);
    setVisible(false);
  };

  const reopen = () => {
    writeDismissed(false);
    setVisible(true);
    setRunId((n) => n + 1);
  };

  const spritePose = phase === "walk"
    ? "is-running"
    : phase === "sneak"
      ? "is-sneaking"
      : reaction === "wave"
        ? "is-waving"
        : reaction === "sneak"
          ? "is-sneaking"
      : phase === "talk"
        ? "is-talking"
        : phase === "wave" || bubbleOpen
        ? "is-waving"
        : "is-peeking";
  const bubbleText = phase === "talk" ? typed : (lastClip?.text ?? "");
  const typing = phase === "talk" && !!clip && typed.length < clip.text.length;
  const fitsRight = x !== null && x + figureWidth() * 0.55 + BUBBLE_WIDTH <= window.innerWidth;
  const fitsLeft = x !== null && x + figureWidth() * 0.45 - BUBBLE_WIDTH >= 0;
  const preferLeft = bubbleSide ? bubbleSide === "left" : x !== null && x + figureWidth() / 2 > window.innerWidth / 2;
  const bubbleOnLeft = preferLeft ? fitsLeft || !fitsRight : !fitsRight && fitsLeft;
  const showCtas = phase === "idle" && isIntro;

  return (
    <>
      {visible && x !== null && (
        <motion.aside
          ref={avatarRef}
          className="fixed bottom-0 left-0 z-40 pointer-events-none"
          style={{ width: figureWidth() }}
          initial={{ x: -figureWidth() - 20 }}
          animate={{ x }}
          transition={{ duration: phase === "walk" || phase === "sneak" ? walkSeconds : 0, ease: "linear" }}
          onAnimationComplete={() => {
            if (phase !== "walk" && phase !== "sneak") return;
            const next = afterWalk.current;
            afterWalk.current = () => {};
            next();
          }}
          aria-label="Kevin's introduction"
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {bubbleOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: bubbleOnLeft ? "bottom right" : "bottom left" }}
                className={cn(
                  "pointer-events-auto absolute bottom-[78%] w-[min(72vw,300px)] surface-card p-4 shadow-2xl shadow-black/50",
                  bubbleOnLeft ? "right-[55%]" : "left-[55%]",
                )}
              >
                <button
                  onClick={dismiss}
                  className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5"
                  aria-label={t("avatar.close")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="mb-2 pr-6 leading-tight">
                  <div className="text-xs font-semibold text-foreground">Kevin Jojo</div>
                  <div className="text-[10px] text-muted-foreground">{t("hero.role1")}</div>
                </div>

                <p className="text-sm text-foreground leading-relaxed min-h-[3.5em]" aria-live="polite">
                  {bubbleText}
                  {typing && <span className="caret">&nbsp;</span>}
                </p>

                {showCtas && (
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

                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-end gap-1">
                  {showCtas && (
                    <button
                      onClick={replay}
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-1.5 py-1"
                    >
                      <RotateCcw className="w-3 h-3" /> {t("avatar.replay")}
                    </button>
                  )}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full-body cartoon sprite. */}
          <div
            aria-hidden="true"
            className={cn("walker-sprite aspect-square w-full", spritePose)}
          />
        </motion.aside>
      )}

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
