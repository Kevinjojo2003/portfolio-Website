import os

from sarvamai import SarvamAI


api_key = os.environ.get("SARVAM_API_KEY")
if not api_key:
    raise SystemExit("SARVAM_API_KEY is missing. Add it to .env before running this script.")

client = SarvamAI(api_subscription_key=api_key)
response = client.chat.completions(
    messages=[{"role": "user", "content": "Give me one short welcome message."}],
    model="sarvam-105b-conversations",
)

print(response.choices[0].message.content)
