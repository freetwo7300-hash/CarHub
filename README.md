# CarHub

A community platform for car enthusiasts to share knowledge, organize events, and collaborate on maintenance.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mostafa-said7s-projects/v0-car-maintenance-community-ka)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![PWA](https://img.shields.io/badge/PWA-Ready-5a67d8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=for-the-badge&logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

## ✨ Features

- **Dashboard** - Personal hub with saved content
- **Forum** - Community discussions & Q&A
- **Events** - Meetups and car shows
- **Guides** - Maintenance tutorials
- **Admin Panel** - Content management
- **PWA** - Installable, offline-ready
- **Dark Mode** - Beautiful theme support
- **Responsive** - Mobile-first design

---

## � Quick Start

### Local Development

```bash
git clone https://github.com/Mostafa-SAID7/CarHub.git
cd CarHub
pnpm install
pnpm dev
```

Open http://localhost:3000

### Docker

```bash
docker-compose up -d
```

---

## � Stack

| | |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Radix UI |
| **Forms** | React Hook Form, Zod |
| **State** | React Context |
| **Tools** | pnpm, Docker |

---

## 📁 Project Structure

```
CarHub/
├── app/              # Pages (Dashboard, Forum, Events, etc.)
├── components/       # Reusable components & UI
├── lib/              # Utilities & helpers
├── public/           # Static assets & PWA files
├── docs/             # Complete documentation
├── .github/          # Workflows & templates
├── Dockerfile        # Container setup
└── package.json      # Dependencies
```

---

## � Documentation

Full guides available in [`docs/`](./docs/):

| Guide | Purpose |
|-------|---------|
| [Getting Started](./docs/GETTING_STARTED.md) | Setup & installation |
| [Architecture](./docs/ARCHITECTURE.md) | System design |
| [Styling](./docs/STYLING_GUIDE.md) | CSS & design system |
| [Components](./docs/COMPONENTS.md) | UI components |
| [Docker](./docs/DOCKER.md) | Containerization |
| [Deployment](./docs/DEPLOYMENT.md) | Deploy to production |
| [Contributing](./docs/CONTRIBUTING.md) | Code guidelines |

---

## 🌐 Deploy

### Vercel (Recommended)
```bash
git push origin main
# Auto-deploys
```

### Docker
```bash
docker build -t carhub .
docker run -p 3000:3000 carhub
```

See [Deployment Guide](./docs/DEPLOYMENT.md) for more options.

---

## 📱 PWA (Progressive Web App)

CarHub works offline and installs on any device:

1. Open in browser
2. Look for "Install" option
3. Add to home screen
4. Enjoy offline access!

Features:
- ✅ Offline support via service worker
- ✅ App manifest for installation
- ✅ Fast caching strategy
- ✅ Mobile responsive

---

## 🤝 Contributing

**Want to help?** See [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

Quick steps:
```bash
git checkout -b feature/your-feature
# Make changes
git commit -m 'feat(module): description'
git push origin feature/your-feature
# Open Pull Request
```

---

## 📄 License

MIT - See [LICENSE](./LICENSE)

---

## 🔗 Links

- 🌐 [Live Demo](https://vercel.com/mostafa-said7s-projects/v0-car-maintenance-community-ka)
- 📖 [Documentation](./docs/)
- 🐛 [Issues](https://github.com/Mostafa-SAID7/CarHub/issues)
- 💬 [Discussions](https://github.com/Mostafa-SAID7/CarHub/discussions)

---

Made with ❤️ by CarHub Community
