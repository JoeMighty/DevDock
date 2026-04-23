<div align="center">
  <h1>🚀 DevDock</h1>
  <p><strong>The ultimate, lightning-fast developer toolkit. 35 offline utilities. Zero backend latency.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

## ✨ Overview

**DevDock** is a web-based platform that provides an essential collection of highly specialized developer tools in one beautifully unified, client-side interface. Stop relying on slow, ad-ridden web apps or spinning up local scripts to format a payload. Everything inside DevDock runs instantly, directly in your browser, with complete privacy.

Designed with a premium glassmorphic Light/Dark aesthetic, DevDock acts as your personal engineering command center.

## 🧰 The 35 Modules

The toolkit is categorized into 6 distinct disciplines:

### 📊 Data & Text
- **JSON to Table**: Instantly visualize, traverse, and export raw nested JSON to CSV.
- **HTML to JSX**: Convert raw DOM strings natively into React functional component logic.
- **Mock Data Gen**: Scaffold array payloads utilizing multiple primitive data schemas.
- **Markdown Editor**: A bidirectional GitHub-Flavored Markdown previewer and Rich-Text IDE.
- **Encoder / Decoder**: Securely perform bidirectional string transformations via Hex or URI bounds.
- **JSON Diff**: A dual-pane split-screen git-style engine for isolating node mutations.
- **Base64 Encoder**: Drag & drop any asset to parse it instantly into a raw `data:image/x;base64` DOM string.
- **CSV ↔ JSON**: Bidirectional conversion between CSV spreadsheet exports and JSON arrays.
- **SQL Formatter**: Paste raw, minified SQL queries to apply consistent indentation and uppercase keywords across PostgreSQL, MySQL, and SQLite dialects.
- **String Toolkit**: 12 naming convention converters in one panel — camelCase, snake_case, SCREAMING_SNAKE, slugify, reverse, and more.
- **Lorem Ipsum**: Generate placeholder words, sentences, or paragraphs instantly for UI prototyping.

### 🌐 Web & Network
- **API Request Tester**: Fire full HTTP protocols, manipulate Headers, bodies, and store local history logs.
- **Sitemap Generator**: Dynamically format static URL tree parameters into ready-to-deploy `sitemap.xml` files.
- **Uptime Monitor**: Actively ping and track the operational latency of critical server endpoints.
- **URL Parser & Builder**: Decompose any URL into its components, visually edit query parameters, and rebuild the final URL.
- **QR Code Designer**: Generate fully custom QR codes with configurable eye shapes, per-element colour overrides, data dot styles, and centre logo embedding.
- **HTTP Status Codes**: A searchable, comprehensive reference for all standard HTTP response codes grouped by class.

### ⚙️ Architecture & Ops
- **Docker Compose Builder**: A graphical form interface bounding network and container logic into strictly evaluated `js-yaml` configurations.
- **Chmod Calculator**: Configure Linux permissions visually, extracting precise Octal and Bash flags.
- **Cron Schedule Generator**: Build complex time-series combinations via a visual UI interface instead of memorizing asterisks.

### 🛡️ Cybersecurity
- **JWT Decoder**: Paste a JSON Web Token to seamlessly parse and expose Headers, Contexts, and valid expirations natively.
- **Hash & UUID**: Quickly generate MD5, SHA-256 variants alongside UUIDv4.
- **Password Analyzer & Generator**: Leverages `zxcvbn` to calculate mathematical entropy or generates XKCD dictionary passphrases with configurable length, symbols, and numbers.
- **Log Sanitizer**: Leverages aggressive Regex to automatically strip specific PII constraints (IPv4, CC, Emails, MAC addresses) out of massive stack traces.
- **CIDR Calculator**: Visual IP network subdivision calculation bounding exactly into mask notations and broadcast addresses.
- **PEM Certificate Decoder**: Parses raw X.509 Base64 certificates stripping out Public Keys, Validity Windows, and Subjects securely offline.
- **Bcrypt Hash Verifier**: Evaluates complex `$2a$` hash buffers asynchronously against plain-text predictions.

### 🔧 Dev Tools
- **Regex Tester**: A playground engine for highlighting matched strings dynamically.
- **Changelog Generator**: Construct standard Markdown sequential update release logs effortlessly.
- **Database Schema Designer**: Map SQL relationship structures and auto-export them to raw DB code chunks.
- **UUID / Nano ID Generator**: Generate cryptographically random UUID v4 or compact Nano IDs with configurable length — ideal for database primary keys and session tokens.
- **Unix Timestamp Converter**: Bidirectional epoch converter — input a Unix timestamp to get a human date, or a date string to extract the epoch.
- **Number Base Converter**: Convert numbers between Decimal, Binary, Octal, and Hexadecimal. Essential for bitmasking and reading memory dumps.

### 🎨 Design & CSS
- **Color Contrast Checker**: Verify WCAG (AA/AAA) bounds across UI color theory palettes.
- **CSS Shadows & Gradients**: Visually render, layer, and extract perfect CSS styling syntax.


## 🚀 Getting Started

DevDock is a **Single Page Application** and runs strictly inside your local browser instance.

### Installation

```bash
git clone https://github.com/JoeMighty/DevDock.git
cd DevDock
npm install
```

### Running Locally

```bash
npm run dev
```

### Fast Deployment

This app is optimized for seamless deployment to **GitHub Pages**. Simply run the build pipeline to compile a minified node map:

```bash
npm run build
npx gh-pages -d dist
```
