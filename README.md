<div align="center">
  <h1>🚀 DevDock</h1>
  <p><strong>The ultimate, lightning-fast developer toolkit. 46 offline utilities. Zero backend latency.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

## ✨ Overview

**DevDock** is a web-based platform providing 46 highly specialized developer tools in one beautifully unified, client-side interface. Stop relying on slow, ad-ridden web apps for your daily workflow. Everything inside DevDock runs instantly and privately in your browser.

Designed with a premium glassmorphic Light/Dark aesthetic, DevDock acts as your personal engineering command center.

## 🧰 The 46 Modules

Organized across 6 disciplines:

### 📊 Data & Text
- **JSON to Table**: Visualize, traverse, and export raw nested JSON to CSV.
- **HTML to JSX**: Convert DOM strings to React functional component logic.
- **Mock Data Gen**: Scaffold typed array payloads across multiple data schemas.
- **Markdown Editor**: Bidirectional GFM previewer and Rich-Text IDE.
- **Encoder / Decoder**: Bidirectional Hex, URI, and Base64 string transformations.
- **JSON Diff**: Dual-pane git-style engine for isolating JSON node mutations.
- **Base64 Encoder**: Drag-and-drop any file to a raw `data:` URI string.
- **CSV ↔ JSON**: Bidirectional spreadsheet-to-array conversion.
- **SQL Formatter**: Prettify minified SQL with uppercase keywords across PostgreSQL, MySQL, and SQLite dialects.
- **String Toolkit**: 12 naming convention converters — camelCase, snake_case, SCREAMING_SNAKE, slugify, and more.
- **Lorem Ipsum**: Words, sentences, or paragraphs of placeholder content for UI prototyping.
- **YAML ↔ JSON**: Bidirectional conversion essential for Kubernetes, GitHub Actions, and Helm charts.
- **Text Diff**: General line-by-line text comparison with split and unified view modes.
- **XML Formatter**: Prettify or minify XML for SOAP APIs, Android manifests, Maven POMs, and RSS feeds.

### 🌐 Web & Network
- **API Request Tester**: Fire full HTTP protocols with headers, bodies, and local history.
- **Sitemap Generator**: Format URL trees into ready-to-deploy `sitemap.xml` files.
- **Uptime Monitor**: Active latency tracking for critical server endpoints.
- **URL Parser & Builder**: Decompose URLs into components and visually edit query parameters.
- **QR Code Designer**: Custom QR codes with configurable eye shapes, per-element colour overrides, and logo embedding.
- **HTTP Status Codes**: Searchable reference for all standard HTTP response codes.

### ⚙️ Architecture & Ops
- **Docker Compose Builder**: Visual form engine outputting strict `js-yaml` container configurations.
- **Chmod Calculator**: Configure Linux permissions visually with Octal and Bash flag output.
- **Cron Schedule Generator**: Build complex cron expressions via a UI instead of memorizing syntax.

### 🛡️ Cybersecurity
- **JWT Decoder**: Parse JSON Web Tokens to expose headers, payloads, and expiration offline.
- **Hash & UUID**: Generate MD5, SHA-256, and UUIDv4 identifiers.
- **Password Analyzer & Generator**: `zxcvbn` entropy scoring plus XKCD-style passphrase generation.
- **Log Sanitizer**: Regex-powered PII scrubbing for IPv4, credit cards, emails, and MAC addresses.
- **CIDR Calculator**: IP network subdivision into mask notations and broadcast addresses.
- **PEM Certificate Decoder**: Parse X.509 Base64 certificates offline for keys, validity, and subjects.
- **Bcrypt Hash Verifier**: Async `$2a$` hash evaluation against plain-text predictions.
- **OTP / TOTP Generator**: Live time-based one-time passwords with countdown timer for 2FA testing.

### 🔧 Dev Tools
- **Regex Tester**: Live match highlighting playground.
- **Changelog Generator**: Standard Markdown release log builder.
- **Database Schema Designer**: Visual SQL table mapper with code export.
- **UUID / Nano ID Generator**: Cryptographically random UUID v4 and configurable Nano IDs.
- **Unix Timestamp Converter**: Bidirectional epoch ↔ human date converter.
- **Number Base Converter**: Decimal, Binary, Octal, and Hexadecimal conversion.
- **.gitignore Generator**: Multi-stack gitignore builder (21 stacks: Node, Python, Go, Laravel, Docker, macOS, JetBrains, and more).
- **curl → Fetch/Axios**: Parse any `curl` command into clean `fetch()` or `axios` JavaScript code.
- **Conventional Commits Builder**: Guided form producing spec-compliant `feat(scope): description` commit messages with breaking change support.
- **Semver Calculator**: Parse a version string and calculate the next major, minor, patch, alpha, beta, and RC bumps.
- **ENV File Formatter**: Validate, deduplicate, sort, and clean `.env` files with real-time feedback.

### 🎨 Design & CSS
- **Color Contrast Checker**: WCAG AA/AAA compliance verification.
- **CSS Shadows & Gradients**: Visually build and extract CSS styling syntax.
- **CSS Unit Converter**: px/rem/em/pt/vw/vh conversion with configurable root font size.
- **Color Palette Generator**: Generate Tailwind-style shade scales, complementary, triadic, split-complementary, and tetradic palettes from any base colour.

## 🚀 Getting Started

```bash
git clone https://github.com/JoeMighty/DevDock.git
cd DevDock
npm install
npm run dev
```

### Deployment

```bash
npm run build
npx gh-pages -d dist
```
