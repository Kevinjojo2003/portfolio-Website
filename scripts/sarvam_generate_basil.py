import base64
import os
from pathlib import Path

from sarvamai import SarvamAI


api_key = os.environ.get("SARVAM_API_KEY")
voice_id = os.environ.get("SARVAM_VOICE_ID")
if not api_key or not voice_id:
    raise SystemExit("SARVAM_API_KEY and SARVAM_VOICE_ID are required.")

client = SarvamAI(api_subscription_key=api_key)
response = client.voice_cloning.convert(
    voice_id=voice_id,
    text="I’m currently in the Founders’ Office at Basil Health, working closely with the team on high-leverage healthcare products and operations.",
    language_code="en-IN",
    output_audio_codec="wav",
    speech_sample_rate=44100,
)

audio = base64.b64decode(response.audio_b64 or response.audio)
output = Path("public/voice/narrate/basil.wav")
output.write_bytes(audio)
print(output)
