---
name: local-origin-guard
description: Check exact loopback Host and explicitly allowed Origin before local bridge requests. Use when connecting a browser editor to a local agent process.
---

# local-origin-guard

Check exact loopback Host and explicitly allowed Origin before local bridge requests.

## Workflow

1. Confirm the input contract and exclusions below before transforming user data.
2. Import the named exports from `scripts/guard.mjs`. Node.js 22+; no npm dependencies. Browser use requires a modern ES module runtime.
3. Run `node --test tests/run.mjs` from this skill folder. The tests contain concrete inputs, expected outputs and rejection cases.
4. Integrate the pure function into the caller. Surface thrown errors as an invalid input result; do not replace failure with empty success.
5. Preserve the original data and inspect a representative output before adding writes or exports.

## Contract and limits

This function is one input filter, not authentication. Bind the server to loopback, validate pairing/session credentials separately, cap bodies, and apply the filter to HTTP and WebSocket handshakes. Native clients without Origin require a separately authenticated route; do not silently allow missing Origin.

## Verification

Run `node --test tests/run.mjs` after copying this folder into an agent's skill directory. Keep `scripts/` and `tests/` together; there are no references to a private source repository. The assertions in `tests/run.mjs` are executable usage examples.
