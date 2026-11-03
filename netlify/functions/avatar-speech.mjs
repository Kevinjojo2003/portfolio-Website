const MAX_TEXT_LENGTH = 520;

const json = (statusCode, body) => new Response(JSON.stringify(body), {
  status: statusCode,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

/**
 * Same-origin proxy for ElevenLabs. The API key must stay in Netlify environment variables;
 * Vite variables are bundled into the browser and must never be used for this credential.
 */
export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "Method not allowed" });

  const origin = request.headers.get("origin");
  if (origin && !/^https:\/\/(?:[a-z0-9-]+\.)?netlify\.app$/i.test(origin)) {
    return json(403, { error: "This endpoint is only available to the portfolio site." });
  }

  const sarvamKey = process.env.SARVAM_API_KEY;
  const sarvamVoiceId = process.env.SARVAM_VOICE_ID;
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  const elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID;
  if ((!sarvamKey || !sarvamVoiceId) && (!elevenLabsKey || !elevenLabsVoiceId)) {
    return json(503, { error: "Avatar voice is not configured yet." });
  }

  let text;
  try {
    ({ text } = await request.json());
  } catch {
    return json(400, { error: "Invalid request body." });
  }
  if (typeof text !== "string" || !text.trim() || text.length > MAX_TEXT_LENGTH) {
    return json(400, { error: `Text must be between 1 and ${MAX_TEXT_LENGTH} characters.` });
  }

  if (sarvamKey && sarvamVoiceId) {
    const form = new FormData();
    form.append("voice_id", sarvamVoiceId);
    form.append("text", text.trim());
    form.append("language_code", "en-IN");
    form.append("output_audio_codec", "wav");
    const upstream = await fetch("https://api.sarvam.ai/voices/clone", {
      method: "POST",
      headers: { "api-subscription-key": sarvamKey },
      body: form,
    });
    if (!upstream.ok) return json(502, { error: "Sarvam voice generation is unavailable." });
    const payload = await upstream.json();
    const encoded = payload.audio_b64 || payload.audio;
    if (!encoded) return json(502, { error: "Sarvam returned no audio." });
    return new Response(Buffer.from(encoded, "base64"), {
      status: 200,
      headers: { "content-type": "audio/wav", "cache-control": "private, max-age=300" },
    });
  }

  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(elevenLabsVoiceId)}/stream`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "xi-api-key": elevenLabsKey,
      accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: text.trim(),
      model_id: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
      voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.12, use_speaker_boost: true },
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return json(upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502, {
      error: "Voice generation is unavailable. Please try again shortly.",
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "private, max-age=300",
    },
  });
};
