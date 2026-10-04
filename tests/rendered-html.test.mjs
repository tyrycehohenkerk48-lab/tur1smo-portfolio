import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/", origin = "http://localhost") {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(url.href);
  return worker.fetch(
    new Request(`${origin}${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the TUR1SMO homepage and metadata", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>TUR1SMO — Sound \/ Visual \/ Motion<\/title>/i);
  assert.match(html, /Selected sounds/i);
  assert.match(html, /Group A/i);
  assert.match(html, /View portfolio/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("redirects www to the HTTPS root while preserving the path and query", async () => {
  for (const origin of ["http://www.tur1smo.com", "https://www.tur1smo.com"]) {
    const response = await render("/beats?category=arrival", origin);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://tur1smo.com/beats?category=arrival");
  }
  assert.equal((await render("/", "https://tur1smo.com")).status, 200);
});

test("renders the confirmed social account and email-draft contact flow", async () => {
  const html = await (await render("/contact")).text();
  assert.match(html, /https:\/\/www\.instagram\.com\/1tur1smo1\//);
  assert.match(html, /mailto:tur1smo848@gmail\.com/);
  assert.match(html, /Open email draft/);
  assert.doesNotMatch(html, /Draft received|Connect a form service|mailto:music@|mailto:visual@/);
});

test("renders the main portfolio routes", async () => {
  for (const [pathname, marker] of [["/beats", "Beat archive"], ["/visual", "Modeling"], ["/visual/modeling", "Selected work"], ["/about", "Creative practice"], ["/contact", "Music / Licensing"]]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), new RegExp(marker, "i"), pathname);
  }
});

test("renders the reusable beat library and rollout categories", async () => {
  const response = await render("/beats");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const marker of ["Mulsanne", "Motorway", "Silverstone", "190E", "Group A", "Velour", "Halogen", "Arrival", "Paddock", "Silver", "Telemetry", "Nightshift", "Côte", "Prototype", "Seek through Silverstone"]) {
    assert.match(html, new RegExp(marker, "i"), marker);
  }
  assert.match(html, /07(?:<!-- -->)?\s*records/i);
  for (const hiddenTitle of ["After Hours", "Costa", "North Line", "Static Bloom"]) {
    assert.doesNotMatch(html, new RegExp(`class="beat-title"[^>]*>${hiddenTitle}<`, "i"), hiddenTitle);
  }
});
