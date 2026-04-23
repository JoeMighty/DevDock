# Changelog

All notable changes to DevDock are documented here.

---

## [1.8.0] — 2026-04-23

### Added
- ✨ **Nginx Config Builder** — Form-based generator for server blocks, reverse proxies, and SPA deployments with SSL templates.
- ✨ **RSA / ECDSA Generator** — Generate cryptographically secure public/private keys (1024-4096 bit) offline using node-forge.
- ✨ **SVG to React Component** — Instant conversion of raw SVG code into type-safe React functional components with camelCase attribute mapping.
- ✨ **Color Name Finder** — Identify the closest human-readable names for any hex color using Euclidean distance logic.
- ✨ **JSON to Go Struct** — Convert JSON objects into Go type definitions with proper tags and camelCasing.
- 📂 **Readme Navigation Tabs** — Added a simulated tab navigation bar at the top of the README for easier access to the Changelog and Releases.

### Companion Tool Pairings Added
- RSA / ECDSA Generator → PEM Decoder
- SVG to React ↔ SVG Optimiser
- Color Name Finder ↔ Color Palette Generator

---

## [1.7.0] — 2026-04-23

### Added
- ✨ **GraphQL Formatter** — Prettify minified GraphQL queries and mutations with proper indentation and multi-line selection sets.
- ✨ **JSON Path Tester** — Test complex JSONPath expressions against JSON structures with live results.
- ✨ **Typography Scale** — Generate mathematical typographic scales (Golden Ratio, Major Third, etc.) for harmonious UI design.
- ✨ **SVG Optimiser** — Minify SVG code by removing metadata, comments, and unnecessary whitespace with live preview and savings stats.
- ✨ **Favicon Generator** — Create project icons and favicons in seconds with custom text, colors, and border radius. Multiple download sizes (16x16 to 512x512).
- 🚀 **Dynamic Code Splitting** — Implemented `React.lazy` and `Suspense`. Tools now load on-demand, reducing initial bundle size by ~90% and improving first-load performance.

### Companion Tool Pairings Added
- GraphQL Formatter → API Tester
- JSON Path Tester → JSON to Table
- Typography Scale → CSS Unit Converter
- SVG Optimiser → Base64 Encoder
- Favicon Generator → QR Code Designer

---

## [1.6.0] — 2026-04-23

### Added
- **Password Generator** — `crypto.getRandomValues()` based password generation with configurable charset (uppercase, lowercase, numbers, symbols, no-ambiguous), length slider (8–128), bulk generate ×1/5/10/20, entropy-based strength bar, and copy support
- **HMAC Calculator** — Sign strings with HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5; outputs both hex and base64 encodings with a webhook use-case reference panel
- **JSON Schema Validator** — Validate JSON documents against JSON Schema Draft-07 using Ajv; shows path-level errors in a highlighted list with dual JSON + schema pane layout
- **robots.txt Generator** — Guided builder for `robots.txt` with per-bot user-agent blocks, Allow/Disallow rules, crawl-delay, 4 built-in presets (Allow All, Block All, SEO Friendly, Block GPTBot), sitemap URL field, live preview, and download
- **Gradient Builder** — Visual CSS gradient builder supporting linear, radial, and conic types; colour stop editor with position sliders, 6 named presets (Aurora, Sunset, Ocean, Emerald, Neon, Radial Glow), angle quick-select, live preview, and copy CSS

### Companion Tool Pairings Added
- Password Generator → Bcrypt Verifier + Password Analyzer
- HMAC Calculator → Hash & UUID Generator + API Tester
- JSON Schema Validator → Mock Data Generator + JSON Diff
- robots.txt Generator → Sitemap Generator
- Gradient Builder → Color Palette Generator + CSS Generator

---

## [1.5.0] — 2026-04-23

### Added
- **Companion Tool Network** — 13 contextual cross-link banners across related tools using a shared `CompanionTool` component
  - curl → Fetch ↔ API Tester
  - Mock Data Gen → JSON to Table + CSV ↔ JSON
  - Conventional Commits ↔ Changelog Generator ↔ Semver Calculator
  - Hash & UUID ↔ Bcrypt Verifier
  - URL Parser → QR Code Designer + API Tester
  - JSON Diff ↔ Text Diff
  - Base64 ↔ JWT Decoder ↔ PEM Decoder
  - SQL Formatter ↔ Schema Designer
  - ENV Formatter ↔ Docker Compose Builder
  - Color Palette Generator ↔ Color Contrast Checker
- **localStorage Persistence** — User preferences saved across sessions via `useLocalStorage` hook for 10 tools: QR Code Designer, Color Palette, Color Contrast Checker, OTP Generator, Conventional Commits, Semver Calculator, CSS Unit Converter, SQL Formatter, Regex Tester, HMAC Calculator
- **Clear Saved Memory button** — Sidebar footer button wipes all `devdock_*` localStorage keys and resets Recently Used list

### Changed
- Welcome modal redesigned with animated stats row (tool count, offline, latency, categories), staggered feature cards, version badge, and memory hint

---

## [1.4.0] — 2026-04-22

### Added
- **Conventional Commits Builder** — Guided form producing spec-compliant `feat(scope)!: description` commit messages with breaking change support
- **Semver Calculator** — Parse a semantic version string and calculate next major, minor, patch, alpha, beta, and RC bumps
- **ENV File Formatter** — Validate, deduplicate, sort, and clean `.env` files with real-time key/value feedback
- **Color Palette Generator** — Generate Tailwind-style shade scales, complementary, triadic, split-complementary, and tetradic palettes from any base colour
- **OTP / TOTP Generator** — Live TOTP code display with countdown timer, configurable algorithm (SHA1/SHA256/SHA512), digits, and period
- **XML Formatter** — Prettify or minify XML for SOAP APIs, Android manifests, Maven POMs, and RSS feeds
- **"New" pill badges** — Cards with `isNew: true` bubble to the top of the homepage grid; newest 4 tools receive the badge automatically
- **Version number** — Displayed in sidebar below the GitHub link, pulled dynamically from `package.json`

---

## [1.3.0] — 2026-04-22

### Added
- **YAML ↔ JSON Converter** — Bidirectional conversion essential for Kubernetes, GitHub Actions, and Helm charts
- **Text Diff** — General line-by-line text comparison with split and unified view modes
- **.gitignore Generator** — Multi-stack builder supporting 21 stacks: Node, Python, Go, Laravel, Docker, macOS, JetBrains, and more
- **curl → Fetch/Axios** — Parse any `curl` command into clean `fetch()` or `axios` JavaScript code
- **CSS Unit Converter** — Instant px/rem/em/pt/vw/vh conversion with configurable root font size and viewport dimensions

---

## [1.2.0] — 2026-04-21

### Added
- **CSV ↔ JSON Converter** — Bidirectional spreadsheet-to-array conversion
- **SQL Formatter** — Prettify minified SQL with PostgreSQL, MySQL, and SQLite dialect support
- **String Toolkit** — 12 naming convention converters (camelCase, snake_case, SCREAMING_SNAKE, slugify, PascalCase, and more)
- **Lorem Ipsum Generator** — Words, sentences, or paragraphs of placeholder content
- **URL Parser & Builder** — Decompose URLs into components and visually edit query parameters
- **QR Code Designer** — Custom QR codes with eye shapes, data dot styles, per-element colour overrides, and logo embedding (powered by `qr-code-styling`)
- **HTTP Status Codes** — Searchable reference for all standard HTTP response codes with descriptions
- **UUID / Nano ID Generator** — Cryptographically random UUID v4 and configurable Nano IDs
- **Unix Timestamp Converter** — Bidirectional epoch ↔ human-readable date conversion
- **Number Base Converter** — Decimal, Binary, Octal, and Hexadecimal conversion

---

## [1.1.0] — 2026-04-20

### Added
- **Docker Compose Builder** — Visual form engine outputting strict `js-yaml` container configurations with port mappings and environment variables
- **Chmod Calculator** — Configure Linux permissions visually with Octal and Bash flag output
- **JSON Diff** — Dual-pane git-style engine for isolating JSON node mutations
- **Base64 File Encoder** — Drag-and-drop any file to a raw `data:` URI string
- **Bcrypt Hash Verifier** — Async `$2a$` hash evaluation against plain-text inputs

---

## [1.0.0] — 2026-04-19

### Initial Release
- 24 core developer tools across 6 categories: Data & Text, Web & Network, Architecture & Ops, Security, Dev Tools, Design & CSS
- Dark/Light mode toggle
- Recently Used tracking in sidebar
- Animated category accordion navigation
- Framer Motion page transitions and card stagger animations
- GitHub Pages deployment via `gh-pages`
