<div align="center">
  <h1>🚀 DevDock</h1>
  <p><strong>The ultimate, lightning-fast developer toolkit. 51 offline utilities. Zero backend latency.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/version-1.7.0-6366f1?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/tools-56-8b5cf6?style=flat-square" alt="Tools" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

## ✨ Overview

**DevDock** is a web-based platform providing **56 highly specialized developer tools** in one beautifully unified, client-side interface. Stop relying on slow, ad-ridden web apps for your daily workflow. Everything inside DevDock runs instantly and privately in your browser — no backend, no telemetry.

Key features:
- 🚀 **On-demand Loading** — Implemented code-splitting; tools only load when you need them.
- **Companion Tool Network** — tools contextually suggest related utilities (e.g. curl → API Tester, Semver → Changelog, Hash → Bcrypt)
- **Persistent Preferences** — colours, regex patterns, QR styles, OTP secrets and more are saved locally via `localStorage`
- **Glassmorphic Light/Dark UI** — premium aesthetic powered by Framer Motion and Tailwind

## 🧰 The 51 Modules

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

### 🛡️ Cybersecurity
| Tool | Description |
|---|---|
| **JWT Decoder** | Parse JSON Web Tokens offline — headers, payload, expiry |
| **Hash & UUID Generator** | MD5, SHA-256, Bcrypt salted hashes, and UUID v4 bulk generation |
| **Password Analyzer** | `zxcvbn` entropy scoring with XKCD passphrase generation |
| **Password Generator** | Cryptographically secure passwords via `crypto.getRandomValues()` — configurable charset, length, bulk mode |
| **HMAC Calculator** | Sign strings with HMAC-SHA256/512/1/MD5 — hex + base64 output for webhook verification |
| **Log Sanitizer** | Regex-powered PII scrubbing for IPs, credit cards, emails, and MAC addresses |
| **CIDR Calculator** | IP network subdivision into mask notations and broadcast addresses |
| **PEM Certificate Decoder** | Parse X.509 Base64 certificates offline for keys, validity, and subjects |
| **Bcrypt Hash Verifier** | Async `$2a$` hash evaluation against plain-text inputs |
| **OTP / TOTP Generator** | Live time-based one-time passwords with countdown timer for 2FA testing |

### 🔧 Dev Tools
| Tool | Description |
|---|---|
| **Regex Tester** | Live match highlighting playground with persistent pattern storage |
| **Changelog Generator** | Standard Markdown release log builder |
| **Database Schema Designer** | Visual SQL table mapper with `CREATE TABLE` export |
| **UUID / Nano ID Generator** | Cryptographically random UUID v4 and configurable Nano IDs |
| **Unix Timestamp Converter** | Bidirectional epoch ↔ human date conversion |
| **Number Base Converter** | Decimal, Binary, Octal, and Hexadecimal conversion |
| **.gitignore Generator** | Multi-stack builder (21 stacks: Node, Python, Go, Docker, macOS, JetBrains, and more) |
| **curl → Fetch/Axios** | Parse any `curl` command into clean `fetch()` or `axios` code |
| **Conventional Commits Builder** | Guided spec-compliant commit message builder with breaking change support |
| **Semver Calculator** | Parse a version string and calculate major/minor/patch/pre-release bumps |
| **ENV File Formatter** | Validate, deduplicate, sort, and clean `.env` files |
| **robots.txt Generator** | Build `robots.txt` with per-bot rules, crawl-delay, presets, and sitemap declaration |
| **JSON Schema Validator** | Validate JSON documents against JSON Schema Draft-07 via Ajv with path-level errors |

### 🎨 Design & CSS
| Tool | Description |
|---|---|
| **Color Contrast Checker** | WCAG AA/AAA compliance verification |
| **CSS Shadows & Gradients** | Visually build and extract CSS styling syntax |
| **CSS Unit Converter** | px/rem/em/pt/vw/vh conversion with configurable root font size and viewport |
| **Color Palette Generator** | Tailwind shade scales, complementary, triadic, tetradic palettes from any base colour |
| **Gradient Builder** | Visual linear/radial/conic CSS gradient builder with stop editor, presets, and live preview |

## 🔗 Companion Tool Network

DevDock features **13+ contextual cross-links** between related tools to guide multi-step workflows:

- `curl → Fetch` ↔ `API Tester`
- `Mock Data Gen` → `JSON to Table` + `CSV ↔ JSON`
- `Conventional Commits` ↔ `Changelog Generator` ↔ `Semver Calculator`
- `Hash & UUID` ↔ `Bcrypt Verifier`
- `Password Generator` → `Bcrypt Verifier` → `Password Analyzer`
- `URL Parser` → `QR Code Designer` + `API Tester`
- `JSON Diff` ↔ `Text Diff`
- `Base64` ↔ `JWT Decoder` ↔ `PEM Decoder`
- `SQL Formatter` ↔ `Schema Designer`
- `ENV Formatter` ↔ `Docker Compose Builder`
- `robots.txt Generator` ↔ `Sitemap Generator`
- `HMAC Calculator` ↔ `Hash & UUID` + `API Tester`
- `Gradient Builder` ↔ `Color Palette Generator`

## 🧠 Persistent Preferences

User settings are automatically saved to `localStorage` — no account, no sync, no server. Includes:
- QR Code styles and colours
- Color palette base colour and contrast checker colours
- Regex patterns and test strings
- OTP secrets, algorithm, and period
- Conventional Commits form state
- Semver version input
- CSS unit converter viewport config
- SQL dialect, gradient stops and type, HMAC key and algorithm, password generator config

Use **Clear saved memory** in the sidebar footer to wipe all stored preferences instantly.

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

## 📦 Changelog

Full version history is in [CHANGELOG.md](./CHANGELOG.md).

