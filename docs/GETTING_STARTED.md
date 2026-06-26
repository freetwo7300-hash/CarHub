# Getting Started with CarHub

A complete guide to set up and run CarHub locally for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.17 or higher (LTS recommended)
- **pnpm**: Version 10.32 or higher (npm 10+ also works, but pnpm recommended)
- **Git**: For version control
- **Docker** (optional): For containerized development

### Check Your Versions

```bash
node --version     # Should be v18.17.0 or higher
pnpm --version     # Should be 10.32.0 or higher
```

## 🔧 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/CarHub.git
cd CarHub
```

### Step 2: Install Dependencies

Using **pnpm** (recommended):

```bash
pnpm install
```

Or using **npm**:

```bash
npm install
```

This will install all dependencies listed in `package.json` (204 packages total).

### Step 3: Start Development Server

```bash
pnpm dev
```

The application will start and be available at:

- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP:3000

### Step 4: Verify Installation

Open http://localhost:3000 in your browser. You should see the CarHub homepage with:

- Navigation menu (Dashboard, Forum, Events, Guides, etc.)
- Hero section with featured content
- Trending section
- Quick access widgets

## 📁 Project Structure Overview

```
CarHub/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── lib/             # Utilities and helpers
├── public/          # Static assets (images, placeholders)
├── styles/          # Global CSS
├── docs/            # Documentation
├── .github/         # GitHub workflows and templates
└── next.config.mjs  # Next.js configuration
```

## 🚀 Available Scripts

### Development

```bash
pnpm dev
```
Starts the development server with hot module reloading on port 3000.

**Turbopack** is enabled for faster builds and instant feedback.

### Build for Production

```bash
pnpm build
```

Creates an optimized production build. Output stored in `.next/` directory.

### Start Production Server

```bash
pnpm start
```

Runs the production-built application locally for testing before deployment.

### Code Linting

```bash
pnpm lint
```

Runs ESLint to check for code quality issues and style violations.

## 🎨 Environment Configuration

### Environment Variables

Create a `.env.local` file for local development variables (not required for basic setup):

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=CarHub
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🌐 Accessing Different Modules

Once the server is running, access various sections:

| Module | URL | Purpose |
|--------|-----|---------|
| Home | http://localhost:3000 | Landing page |
| Dashboard | http://localhost:3000/dashboard | Personal hub |
| Forum | http://localhost:3000/forum | Discussions |
| Events | http://localhost:3000/events | Meetups & shows |
| Guides | http://localhost:3000/guides | Tutorials |
| Admin | http://localhost:3000/admin | Management panel |
| Profile | http://localhost:3000/profile | User profile |

## 🐛 Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
pnpm dev -p 3001
```

### Dependency Installation Issues

Clear cache and reinstall:

```bash
# Using pnpm
pnpm store prune
pnpm install

# Or using npm
npm cache clean --force
npm install
```

### TypeScript Errors

If you see TypeScript errors, regenerate types:

```bash
pnpm build
```

### Build Failures

Check for Node.js version compatibility:

```bash
node --version  # Must be 18.17+
```

Update to latest LTS if needed:
- macOS/Linux: Use nvm
- Windows: Download from https://nodejs.org

## 📦 Dependency Management

### Adding Packages

```bash
# With pnpm
pnpm add package-name

# With npm
npm install package-name
```

### Removing Packages

```bash
# With pnpm
pnpm remove package-name

# With npm
npm uninstall package-name
```

### Updating Dependencies

Check for updates:

```bash
pnpm outdated
```

Update specific package:

```bash
pnpm up package-name@latest
```

## 🐳 Docker Setup (Optional)

For isolated development environment with Docker:

```bash
# Build Docker image
docker build -t carhub:dev .

# Run Docker container
docker run -p 3000:3000 carhub:dev

# Or use Docker Compose
docker-compose up -d
```

See [Docker Guide](./DOCKER.md) for detailed Docker setup.

## 🔍 Browser DevTools

### Enable React Developer Tools

1. Install React Developer Tools extension:
   - [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/)
   - [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)

2. Open browser DevTools (F12 or Right-click → Inspect)

3. Find "Components" or "Profiler" tabs to inspect React components

## 📚 Next Steps

After successful installation:

1. **Explore the Code**: Check out [Architecture Guide](./ARCHITECTURE.md)
2. **Learn Components**: Review [Components Documentation](./COMPONENTS.md)
3. **Styling**: Read [Styling Guide](./STYLING_GUIDE.md)
4. **Contribute**: See [Contributing Guide](./CONTRIBUTING.md)

## ✅ Verification Checklist

- [ ] Node.js 18.17+ installed
- [ ] pnpm 10.32+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`pnpm install`)
- [ ] Development server running (`pnpm dev`)
- [ ] http://localhost:3000 accessible in browser
- [ ] All pages loading correctly
- [ ] No console errors

## 🆘 Need Help?

- Check [Troubleshooting](#troubleshooting) section above
- Search [GitHub Issues](https://github.com/Mostafa-SAID7/CarHub/issues)
- Open a new issue with details about your setup
- Join [GitHub Discussions](https://github.com/Mostafa-SAID7/CarHub/discussions)

---

**Happy coding! 🚀**
