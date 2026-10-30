import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const token = process.env.LINKEDIN_ACCESS_TOKEN;
const authorUrn = process.env.LINKEDIN_AUTHOR_URN;
const apiVersion = process.env.LINKEDIN_API_VERSION || "202610";

if (!token || !authorUrn) {
  throw new Error("Set LINKEDIN_ACCESS_TOKEN and LINKEDIN_AUTHOR_URN in GitHub Actions secrets.");
}

if (!/^urn:li:person:\w+$/.test(authorUrn)) {
  throw new Error("LINKEDIN_AUTHOR_URN must be a LinkedIn person URN (urn:li:person:...).");
}

const query = new URLSearchParams({
  q: "author",
  author: authorUrn,
  count: "20",
  sortBy: "CREATED",
});
const response = await fetch(`https://api.linkedin.com/rest/posts?${query}`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Linkedin-Version": apiVersion,
    "X-Restli-Protocol-Version": "2.0.0",
    Accept: "application/json",
  },
});

if (!response.ok) {
  const detail = (await response.text()).slice(0, 500);
  throw new Error(`LinkedIn API returned ${response.status}: ${detail}`);
}

const payload = await response.json();
const filePath = fileURLToPath(new URL("../src/data/linkedin-posts.json", import.meta.url));
const previous = JSON.parse(await readFile(filePath, "utf8"));
const previousHeights = new Map(previous.map((post) => [post.urn, post.embedHeight]));

const toTitle = (commentary = "") => {
  const firstLine = commentary.trim().split(/\r?\n/).find(Boolean) || "LinkedIn update";
  const sentence = firstLine.split(/(?<=[.!?])\s+/u)[0].trim();
  const title = sentence || firstLine;
  return title.length > 96 ? `${title.slice(0, 93).trimEnd()}…` : title;
};

const posts = (payload.elements || [])
  .filter((post) => post.id && /^urn:li:(?:ugcPost|share|activity):\d+$/.test(post.id))
  .filter((post) => !post.lifecycleState || post.lifecycleState === "PUBLISHED")
  .filter((post) => !post.visibility || post.visibility === "PUBLIC")
  .sort((a, b) => (b.publishedAt || b.createdAt || 0) - (a.publishedAt || a.createdAt || 0))
  .slice(0, 5)
  .map((post) => ({
    urn: post.id,
    title: toTitle(post.commentary),
    embedHeight: previousHeights.get(post.id) || 560,
    publishedAt: post.publishedAt || post.createdAt,
  }));

if (posts.length === 0) {
  throw new Error("LinkedIn returned no public posts for this author.");
}

await writeFile(filePath, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Synced ${posts.length} public LinkedIn posts.`);
