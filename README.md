<div align="center">
  <p>
    <a href="./README.md"><b>📖 README</b></a> | 
    <a href="./CHANGELOG.md"><b>📜 CHANGELOG</b></a> | 
    <a href="https://github.com/JoeMighty/DevDock/releases"><b>🚀 RELEASES</b></a>
  </p>

  <br />

  <h1>🚀 DevDock</h1>
  <p><strong>The ultimate, lightning-fast developer toolkit. 61 offline utilities. Zero backend latency.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/version-1.8.0-6366f1?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/tools-61-8b5cf6?style=flat-square" alt="Tools" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

## ✨ Overview

**DevDock** is a web-based platform providing **61 highly specialized developer tools** in one beautifully unified, client-side interface. Stop relying on slow, ad-ridden web apps for your daily workflow. Everything inside DevDock runs instantly and privately in your browser — no backend, no telemetry.

Key features:
- 🚀 **On-demand Loading** — Implemented code-splitting; tools only load when you need them.
- **Companion Tool Network** — tools contextually suggest related utilities (e.g. curl → API Tester, Semver → Changelog, Hash → Bcrypt)
- **Persistent Preferences** — colours, regex patterns, QR styles, OTP secrets and more are saved locally via `localStorage`
- **Glassmorphic Light/Dark UI** — premium aesthetic powered by Framer Motion and Tailwind

## 🧰 The 61 Modules

Organized across 6 disciplines:

### 📊 Data & Text
| Tool | Description |
|---|---|
| **JSON to Table** | Visualize and export nested JSON to CSV |
| **HTML to JSX** | Convert DOM strings to React functional component code |
| **Mock Data Gen** | Scaffold typed JSON payloads across configurable schemas |
| **Markdown Editor** | Bidirectional GFM previewer and rich-text IDE |
| **Encoder / Decoder** | Bidirectional Hex, URI, and Base64 string transformations |
| **JSON Diff** | Dual-pane git-style engine for isolating JSON mutations |
| **Base64 Encoder** | Drag-and-drop any file to a raw `data:` URI string |
| **CSV ↔ JSON** | Bidirectional spreadsheet-to-array conversion |
| **SQL Formatter** | Prettify minified SQL across PostgreSQL, MySQL, and SQLite dialects |
| **String Toolkit** | 12 naming convention converters — camelCase, snake_case, slugify, and more |
| **Lorem Ipsum** | Words, sentences, or paragraphs of placeholder content |
| **YAML ↔ JSON** | Bidirectional conversion for Kubernetes, GitHub Actions, and Helm |
| **Text Diff** | Line-by-line text comparison with split and unified views |
| **XML Formatter** | Prettify or minify XML for SOAP APIs, Android manifests, and RSS feeds |
| **GraphQL Formatter** | Prettify minified GraphQL queries and mutations |
| **JSON Path Tester** | Test complex JSONPath expressions against JSON structures |

### 🌐 Web & Network
| Tool | Description |
|---|---|
| **API Request Tester** | Fire full HTTP requests with headers, bodies, and local history |
| **Sitemap Generator** | Format URL trees into ready-to-deploy `sitemap.xml` files |
| **Uptime Monitor** | Active latency tracking for critical endpoints |
| **URL Parser & Builder** | Decompose URLs into components and visually edit query parameters |
| **QR Code Designer** | Custom QR codes with eye shapes, colour overrides, and logo embedding |
| **HTTP Status Codes** | Searchable reference for all standard HTTP response codes |
| **Favicon Generator** | Create project icons and favicons in seconds |

### ⚙️ Architecture & Ops
| Tool | Description |
|---|---|
| **Docker Compose Builder** | Visual form engine outputting strict `js-yaml` container configurations |
| **Chmod Calculator** | Configure Linux permissions visually with Octal and Bash flag output |
| **Cron Schedule Generator** | Build complex cron expressions via a guided UI |
| **Nginx Config Builder** | Guided builder for server blocks, reverse proxies, and SSL |

### 🛡️ Cybersecurity
| Tool | Description |
|---|---|
| **JWT Decoder** | Parse JSON Web Tokens offline — headers, payload, expiry |
| **Hash & UUID Generator** | MD5, SHA-256, Bcrypt salted hashes, and UUID v4 bulk generation |
| **Password Analyzer** | `zxcvbn` entropy scoring with XKCD passphrase generation |
| **Password Generator** | Cryptographically secure passwords via `crypto.getRandomValues()` |
| **HMAC Calculator** | Sign strings with HMAC-SHA256/512/1/MD5 for webhook verification |
| **RSA / ECDSA Gen** | Generate public/private key pairs for SSH and TLS |
| **Log Sanitizer** | Regex-powered PII scrubbing (IPs, cards, emails) |
| **CIDR Calculator** | IP network subdivision into mask notations |
| **PEM Certificate Decoder** | Parse X.509 Base64 certificates offline |
| **Bcrypt Hash Verifier** | Async `$2a$` hash evaluation against inputs |
| **OTP / TOTP Generator** | Live 2FA code generation with countdown timer |

### 🔧 Dev Tools
| Tool | Description |
|---|---|
| **Regex Tester** | Live match highlighting playground |
| **Changelog Generator** | Standard Markdown release log builder |
| **Database Schema Designer** | Visual SQL table mapper with code export |
| **UUID / Nano ID Generator** | Cryptographically random UUID v4 and Nano IDs |
| **Unix Timestamp Converter** | Bidirectional epoch ↔ human date conversion |
| **Number Base Converter** | Decimal, Binary, Octal, and Hexadecimal conversion |
| **.gitignore Generator** | Multi-stack builder (Node, Python, Go, Docker, etc.) |
| **curl → Fetch/Axios** | Parse any `curl` command into clean JS code |
| **Conventional Commits** | Guided spec-compliant commit message builder |
| **Semver Calculator** | Parse a version string and calculate bumps |
| **ENV File Formatter** | Validate, deduplicate, sort, and clean `.env` files |
| **robots.txt Generator** | Build `robots.txt` with per-bot rules and presets |
| **JSON Schema Validator** | Validate JSON against schemas using Ajv |
| **SVG to React** | Convert SVG code into functional React components |
| **JSON to Go Struct** | Convert JSON objects into Go type definitions |

### 🎨 Design & CSS
| Tool | Description |
|---|---|
| **Color Contrast Checker** | WCAG AA/AAA compliance verification |
| **CSS Shadows & Gradients** | Visually build and extract CSS styling syntax |
| **CSS Unit Converter** | px/rem/em/pt/vw/vh conversion |
| **Color Palette Generator** | Tailwind-style shade scales and complementary palettes |
| **Gradient Builder** | Visual linear/radial/conic CSS gradient builder |
| **Typography Scale** | Mathematical typographic scales for harmonious UI design |
| **SVG Optimiser** | Minify SVG code by removing metadata and whitespace |
| **Color Name Finder** | Identify the closest official name and CSS variable for any hex code |

## 🔗 Companion Tool Network

- `robots.txt Generator` ↔ `Sitemap Generator`
- `HMAC Calculator` ↔ `Hash & UUID` + `API Tester`
- `Gradient Builder` ↔ `Color Palette Generator`
- `GraphQL Formatter` → `API Tester`
- `JSON Path Tester` → `JSON to Table`
- `Typography Scale` → `CSS Unit Converter`
- `SVG Optimiser` → `Base64 Encoder`
- `Favicon Generator` → `QR Code Designer`
- `RSA / ECDSA Gen` → `PEM Decoder`
- `SVG to React` ↔ `SVG Optimiser`
- `Color Name Finder` ↔ `Color Palette Generator`

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

Full version history is in [CHANGELOG.md](./CHANGELOG.md).
