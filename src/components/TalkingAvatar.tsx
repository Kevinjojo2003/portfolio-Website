import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/**
 * Kevin walks in along the bottom edge of the page (the screen edge hides everything below his
 * chest), waves, and introduces himself with lip-synced clips in his cloned voice. Afterwards,
 * resting the mouse on any element marked `data-narrate="<id>"` makes him walk over and say the
 * matching `narrate.<id>` line.
 *
 * Clips are transparent video: HEVC-with-alpha .mov for Safari, VP9-alpha .webm elsewhere. They
 * are pre-rendered for English only; other languages fall back to the browser voice over the still.
 */

type Phase = "walk" | "wave" | "talk" | "idle";

interface Clip {
  /** Text shown in the speech bubble. */
  text: string;
  /** Path without extension of the lip-synced video (English only). */
  video?: string;
  /** Matching cloned-voice audio. */
  audio?: string;
}

const STILL = "/avatar/walk/still.webp";
const WAVE = "/avatar/walk/wave";
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

// Safari only renders alpha from HEVC; every other browser gets VP9 with alpha.
const isSafari = () => typeof navigator !== "undefined" && /^((?!chrome|chromium|android|crios|fxios).)*safari/i.test(navigator.userAgent);
const videoSrc = (base: string) => `${base}${isSafari() ? ".mov" : ".webm"}`;

const figureWidth = () => (window.innerWidth < 768 ? 150 : 210);
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
    video: english ? `/avatar/walk/line${n}` : undefined,
    audio: english ? `/voice/line${n}.m4a` : undefined,
  }));
  const narrationClip = (id: string): Clip => ({
    text: t(`narrate.${id}`),
    video: english ? `/avatar/narrate/${id}` : undefined,
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
  // Clips that failed to load or play; those lines fall back to the still.
  const [failedVideos, setFailedVideos] = useState<string[]>([]);
  const markFailed = useCallback((video?: string) => {
    if (video) setFailedVideos((list) => (list.includes(video) ? list : [...list, video]));
  }, []);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  // Which side of him the bubble goes during hover narration (null: toward the page's middle).
  const [bubbleSide, setBubbleSide] = useState<"left" | "right" | null>(null);
  const [runId, setRunId] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const afterWalk = useRef<() => void>(() => {});

  const clip = phase === "talk" ? queue[clipIdx] : undefined;
  const lastClip = queue[queue.length - 1];

  /** Walk (with the bob) from `from` (default: where he stands) to `targetX`, then run `next`. */
  const walkTo = useCallback(
    (targetX: number, next: () => void, from = x ?? window.innerWidth + 20) => {
      const distance = Math.abs(targetX - from);
      if (reduceMotion || distance < 12) {
        setX(targetX);
        next();
        return;
      }
      afterWalk.current = next;
      setWalkSeconds(Math.max(0.6, distance / WALK_PX_PER_SECOND));
      setPhase("walk");
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

  const startIntro = useCallback(() => {
    walkTo(
      restX(),
      () => {
        if (reduceMotion) play(introClips, true);
        else setPhase("wave");
      },
      window.innerWidth + 20,
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

    const video = videoRef.current;
    const hasVideo = !!clip.video && !failedVideos.includes(clip.video) && !!video;
    if (hasVideo) {
      video.onended = next;
      video.currentTime = 0;
      video.play().catch(() => markFailed(clip.video));
    }
    if (audio) {
      audio.onerror = () => !hasVideo && byTextLength();
      if (!hasVideo) audio.onended = next;
      audio.play().catch(() => !hasVideo && byTextLength());
    } else if (!hasVideo) {
      if (!(voiceOn && speakWithBrowser(clip.text, i18n.language, () => timers.push(window.setTimeout(next, 300))))) {
        byTextLength();
      }
    }

    return () => {
      finished = true;
      timers.forEach((id) => window.clearTimeout(id));
      if (video) video.onended = null;
      audio?.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [phase, clip, clipIdx, queue.length, isIntro, voiceOn, failedVideos, markFailed, i18n.language]);

  // Hover narration: rest the pointer on a [data-narrate] element and he walks over to explain it.
  useEffect(() => {
    if (!visible || !introDone) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let timer = 0;
    let current: Element | null = null;

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-narrate]") ?? null;
      if (el === current) return;
      current = el;
      window.clearTimeout(timer);
      if (!el) return;
      timer = window.setTimeout(() => {
        const id = el.getAttribute("data-narrate");
        if (!id || !i18n.exists(`narrate.${id}`)) return;
        const rect = el.getBoundingClientRect();
        const standRight = rect.right + figureWidth() + 16 <= window.innerWidth;
        const side = standRight ? rect.right + 16 : rect.left - figureWidth() - 16;
        setBubbleOpen(false);
        // Speak away from the item so the bubble doesn't cover what the visitor is reading.
        setBubbleSide(standRight ? "right" : "left");
        walkTo(clampX(side), () => play([narrationClip(id)], false));
      }, NARRATE_DWELL_MS);
    };

    document.addEventListener("pointerover", onOver);
    return () => {
      document.removeEventListener("pointerover", onOver);
      window.clearTimeout(timer);
    };
    // narrationClip only reads t(); walkTo/play are stable enough for a hover handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, introDone, walkTo, play, i18n]);

  const replay = () => {
    setFailedVideos([]);
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

  // Which video (if any) is on screen: the wave during the greeting, the lip-sync clip while talking.
  const videoBase = phase === "wave" ? WAVE : clip?.video && !failedVideos.includes(clip.video) ? clip.video : null;
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
          className="fixed bottom-0 left-0 z-40 pointer-events-none"
          style={{ width: figureWidth() }}
          initial={{ x: window.innerWidth + 20 }}
          animate={{ x }}
          transition={{ duration: phase === "walk" ? walkSeconds : 0, ease: "linear" }}
          onAnimationComplete={() => {
            if (phase !== "walk") return;
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

          {/* Kevin, cut off by the bottom of the screen */}
          <div
            className={cn("walker relative aspect-square w-full", phase === "walk" && !reduceMotion && "is-walking", phase === "idle" && "is-idle")}
          >
            {/* The clips are transparent, so hide the still once a clip is actually showing. */}
            <img
              src={STILL}
              alt=""
              className={cn("absolute inset-0 w-full h-full object-contain", videoBase && playingVideo === videoBase && "invisible")}
              draggable={false}
            />
            {videoBase && (
              <video
                key={videoBase}
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain"
                src={videoSrc(videoBase)}
                muted
                playsInline
                autoPlay={phase === "wave"}
                preload="auto"
                aria-hidden="true"
                onPlaying={() => setPlayingVideo(videoBase)}
                onEnded={phase === "wave" ? () => play(introClips, true) : undefined}
                onError={() => (phase === "wave" ? play(introClips, true) : markFailed(clip?.video))}
              />
            )}
          </div>
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
