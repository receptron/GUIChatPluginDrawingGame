/**
 * Regression test for receptron/mulmoclaude#2709.
 *
 * Hosts that run a plugin without any client-side state (MulmoClaude's server
 * bridge) pass a missing or empty context. Reading through it unguarded threw
 * `Cannot read properties of null` and surfaced as an HTTP 500 for every call.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { pluginCore } from "../src/core/plugin.js";

const ARGS = { action: "start" };

const CONTEXTS: [string, unknown][] = [
  ["null", null],
  ["undefined", undefined],
  ["an empty object", {}],
];

describe("GUIChatPluginDrawingGame - host provides no context", () => {
  CONTEXTS.forEach(([label, context]) => {
    test(`returns a result instead of throwing when context is ${label}`, async () => {
      const result = await pluginCore.execute(
        context as never,
        ARGS as never,
      );
      assert.ok(
        result && typeof result === "object",
        "execute must resolve to a ToolResult rather than throw",
      );
    });
  });
});
