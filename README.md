<div align="center">
  <img src="./public/icons.svg" alt="DevDock Logo" width="100"/>
  <h1>🚀 DevDock</h1>
  <p><strong>Your centralized, lightning-fast developer toolkit.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=plastic&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=plastic&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=plastic&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=plastic&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=plastic&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Convex-FF714A?style=plastic&logo=convex&logoColor=white" alt="Convex" />
  </p>

  <br />
</div>

## ✨ Overview

**DevDock** is a web-based platform that provides an essential collection of developer tools in one beautifully unified, client-side interface. Stop relying on slow, ad-ridden web apps or opening twenty different tabs for your daily workflow. Everything inside DevDock runs instantly, entirely in your browser, with zero backend latency for the core tools.

Designed with a premium SaaS-like deep space aesthetic, DevDock acts as your personal command center.

## 🧰 Features

DevDock comes packed with 12 distinct tools:

- **JSON to Table**: Instantly visualize, traverse, and export raw JSON to CSV.
- **API Request Tester**: Fire standard HTTP requests, modify headers and bodies, with built-in history.
- **JWT Decoder**: Paste a JSON Web Token to extract the header and payload safely offline.
- **Regex Tester**: Live visual highlighting for Javascript Regular Expressions.
- **Cron Schedule Generator**: Build complex cron combinations visually instead of memorizing syntax.
- **Encoder / Decoder**: Securely perform bidirectional string transformations like Base64 or URL encoding.
- **Color Contrast Checker**: Verify WCAG (AA/AAA) color compliance mathematically.
- **Changelog Generator**: Construct standard Markdown changelogs effortlessly.
- **CSS Generator**: Visually tweak linear gradients and box-shadow variables and copy the raw output.
- **Database Schema Designer**: Build visual SQL tables and quickly compile raw code definitions.
- **Sitemap Generator**: Dynamically traverse URLs to auto-generate ready-to-deploy XML structures.
- **Uptime Monitor**: Visually check and persist realtime latency metrics for critical endpoints.

## 🚀 Getting Started

The magic behind DevDock is that it is primarily a **Single Page Application** and runs strictly inside the browser. Currently, there is an initial groundwork for a Convex BaaS server if persistent cloud features are needed, but the MVP is fully functional statically.

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

### Deployment

This app is optimized for seamless deployment to **GitHub Pages**. Simply run the following command to build and automatically push the `gh-pages` branch:

```bash
npm run build
npx gh-pages -d dist
```
