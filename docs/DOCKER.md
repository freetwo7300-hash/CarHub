# Docker Setup Guide

Complete guide to containerizing and running CarHub with Docker.

## 🐳 Docker Overview

Docker allows you to package CarHub with all dependencies into a container, ensuring consistent environment across development, testing, and production.

### Benefits

- ✅ Isolated environment
- ✅ Consistent across machines
- ✅ Easy deployment
- ✅ No "works on my machine" problems
- ✅ Microservices-ready
- ✅ CI/CD integration

---

## 📋 Prerequisites

### Install Docker

#### macOS

```bash
# Using Homebrew
brew install docker

# Or download Docker Desktop
https://www.docker.com/products/docker-desktop
```

#### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (optional)
sudo usermod -aG docker $USER
newgrp docker
```

#### Windows

Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

### Verify Installation

```bash
docker --version          # Should show docker version
docker run hello-world    # Should run successfully
```

---

## 🔨 Building Docker Images

### Development Image

Optimized for development with faster rebuilds:

```bash
# Build development image
docker build -t carhub:dev .

# Run development container
docker run -p 3000:3000 carhub:dev
```

### Production Image

Optimized for production with smaller size and better performance:

```bash
# Build production image (multi-stage build)
docker build -t carhub:latest . --target production

# Run production container
docker run -p 3000:3000 carhub:latest
```

---

## 🐳 Docker Compose

### Basic Setup

Run CarHub with Docker Compose for easier orchestration:

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Compose File

**`docker-compose.yml`**:

```yaml
version: '3.8'

services:
  carhub:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_APP_NAME=CarHub
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    restart: unless-stopped
```

---

## 📝 Dockerfile Reference

### Development Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy lock file
COPY pnpm-lock.yaml .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
```

### Production Dockerfile (Multi-stage)

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml .
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build

# Runtime stage
FROM node:20-alpine AS runtime

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]
```

---

## 🚀 Running Containers

### Basic Commands

```bash
# Build image
docker build -t carhub:latest .

# List images
docker images

# Run container
docker run -p 3000:3000 carhub:latest

# List running containers
docker ps

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# View logs
docker logs <container-id>
```

### Run with Options

```bash
# Run with environment variables
docker run \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_APP_NAME=CarHub \
  carhub:latest

# Run with volume mount (for development)
docker run \
  -p 3000:3000 \
  -v $(pwd):/app \
  carhub:dev

# Run in detached mode (background)
docker run -d -p 3000:3000 --name carhub carhub:latest

# Run with resource limits
docker run \
  -p 3000:3000 \
  --memory="512m" \
  --cpus="1" \
  carhub:latest
```

---

## 🔧 Environment Configuration

### Environment Variables

Create `.env` file for Docker environment:

```bash
# .env
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=CarHub
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Pass Environment Variables

#### In docker-compose.yml

```yaml
services:
  carhub:
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_NAME=CarHub
```

#### Via command line

```bash
docker run \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_APP_NAME=CarHub \
  -p 3000:3000 \
  carhub:latest
```

#### Via .env file

```bash
docker run \
  --env-file .env \
  -p 3000:3000 \
  carhub:latest
```

---

## 📊 Docker Compose Advanced

### Multi-Service Setup

```yaml
version: '3.8'

services:
  # Next.js application
  carhub:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/carhub
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - carhub-network

  # PostgreSQL database (future)
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: carhubuser
      POSTGRES_PASSWORD: securepassword
      POSTGRES_DB: carhub
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - carhub-network

  # Redis cache (future)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - carhub-network

volumes:
  postgres_data:

networks:
  carhub-network:
    driver: bridge
```

---

## 🔒 Security Best Practices

### Docker Security

1. **Use specific base image versions**
   ```dockerfile
   FROM node:20.10-alpine  # Specific version
   ```

2. **Run as non-root user**
   ```dockerfile
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nextjs -u 1001
   USER nextjs
   ```

3. **Use .dockerignore**
   ```
   .git
   .gitignore
   .env
   node_modules
   .next
   .DS_Store
   ```

4. **Scan for vulnerabilities**
   ```bash
   docker scout cves carhub:latest
   ```

5. **Keep images small**
   - Use Alpine Linux
   - Multi-stage builds
   - Only include necessary files

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
docker run -p 3001:3000 carhub:latest
```

### Container Crashes on Start

```bash
# View logs
docker logs <container-id>

# Run with interactive terminal
docker run -it carhub:latest /bin/sh
```

### Out of Memory

```bash
# Increase memory limit
docker run \
  --memory="1g" \
  -p 3000:3000 \
  carhub:latest
```

### Dependency Installation Fails

```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t carhub:latest .
```

---

## 📈 Performance Optimization

### Build Optimization

```dockerfile
# Use cache layers effectively
FROM node:20-alpine
WORKDIR /app

# Install dependencies first (cacheable)
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy source (invalidates cache if changed)
COPY . .

# Build application
RUN pnpm build
```

### Runtime Optimization

```bash
# Use production image (smaller)
docker build -t carhub:prod --target production .

# Check image size
docker images carhub

# Optimize with Alpine Linux
# Images are ~300MB vs ~1GB with full Node
```

---

## 🚀 Deployment with Docker

### Local Testing

```bash
# Build and test locally
docker build -t carhub:test .
docker run -p 3000:3000 carhub:test

# Visit http://localhost:3000
```

### Docker Registry (Docker Hub)

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag carhub:latest yourusername/carhub:latest

# Push to registry
docker push yourusername/carhub:latest

# Pull from registry
docker pull yourusername/carhub:latest
```

### Cloud Deployment

#### AWS ECS

```bash
# Create ECR repository
aws ecr create-repository --repository-name carhub

# Build and push
docker build -t carhub:latest .
docker tag carhub:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/carhub:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/carhub:latest
```

#### Google Cloud Run

```bash
# Configure Docker for Google Cloud
gcloud auth configure-docker

# Build and push
docker build -t gcr.io/your-project/carhub:latest .
docker push gcr.io/your-project/carhub:latest

# Deploy
gcloud run deploy carhub --image gcr.io/your-project/carhub:latest
```

#### Heroku

```bash
# Login to Heroku
heroku container:login

# Build and push
heroku container:push web --app your-carhub-app

# Release
heroku container:release web --app your-carhub-app
```

---

## 🔗 Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `docker build -t name:tag .` | Build image |
| `docker run -p 3000:3000 image` | Run container |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker logs container` | View logs |
| `docker exec -it container sh` | Interactive shell |
| `docker stop container` | Stop container |
| `docker rm container` | Remove container |
| `docker images` | List images |
| `docker rmi image` | Remove image |
| `docker-compose up` | Start services |
| `docker-compose down` | Stop services |

---

## 📚 Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices)
- [Docker Compose Documentation](https://docs.docker.com/compose)
- [Node.js Docker Images](https://hub.docker.com/_/node)

---

## 🔗 Related Guides

- [Getting Started](./GETTING_STARTED.md) - Local setup
- [Deployment](./DEPLOYMENT.md) - Production deployment
- [Architecture](./ARCHITECTURE.md) - System design

---

**Last Updated**: 2024
