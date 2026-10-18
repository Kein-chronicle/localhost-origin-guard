# localhost-origin-guard

**Allow a browser app to talk to your local agent or bridge only if the Host is exact loopback and the Origin is explicitly allow-listed.**

[![test](https://github.com/Kein-chronicle/localhost-origin-guard/actions/workflows/test.yml/badge.svg)](https://github.com/Kein-chronicle/localhost-origin-guard/actions/workflows/test.yml) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Why

A local server reachable from any web page is a remote-control surface. Checking `Origin` and the `Host` header exactly blocks cross-site requests and DNS-rebinding style hosts such as `localhost:8731.evil.example`.

## Install

**As a Claude Code skill** (Claude uses it when the task matches the skill description):

```sh
git clone https://github.com/Kein-chronicle/localhost-origin-guard.git ~/.claude/skills/local-origin-guard
```

For a single project, clone into `<project>/.claude/skills/local-origin-guard` instead, then start a new Claude Code session.

**As a library** (Node.js 22+, no dependencies):

```sh
npm install github:Kein-chronicle/localhost-origin-guard
```

or copy the one file you need: `scripts/guard.mjs` is self-contained.

**Requires:** Node.js 22+.

## Quick start

Run the quickstart:

```console
$ node examples/quickstart.mjs
true  allowed origin on loopback
true  127.0.0.1 is fine too
false unlisted origin
false origin with trailing slash (not canonical)
false DNS-rebinding style Host
false wrong port in Host
false no Origin header at all
```

The output above is real: it is produced by the files in `examples/`.

## API

```js
import { requestAllowed } from 'localhost-origin-guard';

requestAllowed({
  host: req.headers.host, origin: req.headers.origin,
  port: 8731, allowedOrigins: ['https://editor.example.com'],
});  // true / false
```

`Host` must be exactly `localhost:PORT`, `127.0.0.1:PORT` or `[::1]:PORT`; `Origin` must be in the list and in canonical form (`https://editor.example.com`, no trailing slash). Anything else is `false`.
Apply it to HTTP requests and to the WebSocket handshake.

## Limits

- One input filter, not authentication: bind to loopback, also require a pairing or session credential, and cap request bodies.
- Native clients that send no Origin need a separate authentication path.

## Related projects

These solve neighbouring problems; use them when they fit better.

- **`cors` middleware**: sets response headers; it does not stop a request from being processed

## More from the same collection

Small, tested tools that grew out of running AI agents and game/app pipelines for months:

- [**pdf-page-range-parser**](https://github.com/Kein-chronicle/pdf-page-range-parser): Parse "1-3, 5, 8-" page selections into exact ranges without silently sorting or deduplicating, and reject anything ambiguous.
- [**pdf-annotation-rotation**](https://github.com/Kein-chronicle/pdf-annotation-rotation): Rotate PDF/canvas annotations (boxes, lines, ink, source masks) a quarter turn in display coordinates, without mutating the input.
- [**pdf-text-position-table-extract**](https://github.com/Kein-chronicle/pdf-text-position-table-extract): Rebuild a rectangular table from positioned text fragments (x, baseline, size, text), keeping empty cells in place.

## Development

```sh
node --test tests/run.mjs
```

The tests include inputs that are supposed to be rejected, so a green run also shows the checks can fail. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

If this saved you a debugging session, a star helps other people find it. Bug reports and failing test cases are even better.

<sub>Keywords: security, localhost, cors, dns-rebinding, websocket, javascript, esm, zero-dependencies</sub>
