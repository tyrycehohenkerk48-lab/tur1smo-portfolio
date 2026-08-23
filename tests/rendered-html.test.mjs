import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/") {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(url.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
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
  assert.match(html, /Motorway/i);
  assert.match(html, /View portfolio/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the main portfolio routes", async () => {
  for (const [pathname, marker] of [["/beats", "Beat archive"], ["/visual", "Modeling"], ["/visual/modeling", "Selected work"], ["/about", "Creative practice"], ["/contact", "Music / Licensing"]]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), new RegExp(marker, "i"), pathname);
  }
});

test("renders the reusable beat library and all categories", async () => {
  const response = await render("/beats");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const marker of ["Motorway", "After Hours", "Static Bloom", "Dark", "Ambient", "Melodic", "Experimental", "Soul", "Seek through Motorway"]) {
    assert.match(html, new RegExp(marker, "i"), marker);
  }
});
