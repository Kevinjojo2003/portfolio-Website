import os
from pathlib import Path

from sarvamai import SarvamAI


api_key = os.environ.get("SARVAM_API_KEY")
if not api_key:
    raise SystemExit("SARVAM_API_KEY is missing. Add it to .env before running this script.")

reference = Path(os.environ.get("SARVAM_REFERENCE_AUDIO", "public/voice/narrate/kolo.wav"))
if not reference.exists():
    raise SystemExit(f"Reference recording not found: {reference}")

client = SarvamAI(api_subscription_key=api_key)
with reference.open("rb") as audio:
    response = client.voice_cloning.create_voice(
        file=audio,
        name="Kevin Jojo",
        language="en-IN",
        style="conversational",
    )

print(response.data.voice_id)
