import assert from "node:assert/strict";
import { test } from "node:test";
import { createLinkSchema, linkIdSchema, updateLinkSchema } from "./schemas";

const linkId = "123e4567-e89b-42d3-a456-426614174000";

test("validates link IDs for mutations", () => {
  assert.equal(linkIdSchema.parse(linkId), linkId);
  for (const id of ["", "invalid", "123", null, undefined, 123, {}]) {
    assert.equal(linkIdSchema.safeParse(id).success, false);
  }
});

test("editing requires a link ID, destination, and nonblank short code", () => {
  const input = { id: linkId, originalUrl: "https://example.com", customSlug: "my-link" };
  assert.deepEqual(updateLinkSchema.parse(input), input);
  for (const overrides of [
    { id: "invalid" }, { id: undefined }, { originalUrl: "javascript:alert(1)" },
    { customSlug: "" }, { customSlug: "   " }, { customSlug: undefined },
    { customSlug: "ab" }, { customSlug: "a".repeat(65) }, { customSlug: "DASHBOARD" },
    { customSlug: "has/slash" },
  ]) {
    assert.equal(updateLinkSchema.safeParse({ ...input, ...overrides }).success, false);
  }
});

test("editing trims fields and strips client-supplied ownership", () => {
  assert.deepEqual(updateLinkSchema.parse({
    id: linkId,
    originalUrl: " https://example.com/path?query=1#fragment ",
    customSlug: " My-Link_123 ",
    userId: "another-user",
  }), {
    id: linkId,
    originalUrl: "https://example.com/path?query=1#fragment",
    customSlug: "My-Link_123",
  });
});

test("accepts HTTP and HTTPS destinations and preserves paths, queries, and fragments", () => {
  for (const originalUrl of [
    "https://example.com/a/path?source=dashboard#section",
    "http://example.com",
    "https://example.com:8443/path",
  ]) {
    assert.deepEqual(createLinkSchema.parse({ originalUrl }), { originalUrl });
  }
});

test("trims surrounding whitespace", () => {
  assert.deepEqual(
    createLinkSchema.parse({ originalUrl: "  https://example.com/path  " }),
    { originalUrl: "https://example.com/path" },
  );
});

test("rejects empty, malformed, relative, and unsafe URLs", () => {
  for (const originalUrl of [
    "",
    "   ",
    "not a url",
    "example.com",
    "/dashboard",
    "https://",
    "https://exa mple.com",
    "javascript:alert(1)",
    "data:text/html,test",
    "file:///etc/passwd",
    "ftp://example.com",
  ]) {
    assert.equal(createLinkSchema.safeParse({ originalUrl }).success, false, originalUrl);
  }
});

test("rejects invalid input shapes at runtime", () => {
  for (const input of [undefined, null, {}, { originalUrl: 123 }, { originalUrl: null }]) {
    assert.equal(createLinkSchema.safeParse(input).success, false);
  }
});

test("does not accept client-supplied ownership or short codes", () => {
  assert.deepEqual(
    createLinkSchema.parse({
      originalUrl: "https://example.com",
      userId: "another-user",
      shortCode: "supplied-code",
    }),
    { originalUrl: "https://example.com" },
  );
});

test("accepts optional or blank slugs and trims custom slugs", () => {
  for (const customSlug of ["", "   ", "my-custom_link", "ABC", "a".repeat(64)]) {
    assert.deepEqual(
      createLinkSchema.parse({ originalUrl: "https://example.com", customSlug }),
      { originalUrl: "https://example.com", customSlug: customSlug.trim() },
    );
  }
  assert.equal(
    createLinkSchema.parse({
      originalUrl: "https://example.com",
      customSlug: "  My-Campaign_123  ",
    }).customSlug,
    "My-Campaign_123",
  );
});

test("rejects malformed, too short, too long, and reserved slugs", () => {
  for (const customSlug of [
    "ab",
    "a".repeat(65),
    "my slug",
    "my/link",
    "../path",
    "slug?query",
    "slug#fragment",
    "café",
    "dashboard",
    "DASHBOARD",
    "api",
    "_next",
    null,
    123,
  ]) {
    const result = createLinkSchema.safeParse({
      originalUrl: "https://example.com",
      customSlug,
    });
    assert.equal(result.success, false, String(customSlug));
    if (!result.success) {
      assert.equal(result.error.issues[0].path[0], "customSlug");
    }
  }
});
