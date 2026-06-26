# Deployment Guide

Complete guide to deploying CarHub to various platforms.

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel (Recommended)](#vercel-recommended)
- [Docker](#docker)
- [AWS](#aws)
- [Google Cloud](#google-cloud)
- [Heroku](#heroku)
- [Self-Hosted](#self-hosted)
- [CI/CD Setup](#cicd-setup)

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Code is tested and working locally
- [ ] All dependencies are up-to-date
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Database migrations completed (if applicable)
- [ ] Build successful: `pnpm build`
- [ ] No sensitive data in code
- [ ] Documentation updated
- [ ] Version number updated (if applicable)
- [ ] Git committed and pushed

---

## 🚀 Vercel (Recommended)

### Why Vercel?

- Zero-config deployment
- Automatic scaling
- Preview deployments
- Built-in analytics
- Optimal Next.js integration
- Fast CDN

### Step 1: Connect Repository

1. Go to [Vercel](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New..." → "Project"
4. Select your CarHub repository
5. Click "Import"

### Step 2: Configure Project

```javascript
// Vercel auto-detects Next.js project
// Settings are usually correct by default
```

**Key Settings**:
- **Framework**: Next.js (auto-detected)
- **Root Directory**: ./ (or your app directory)
- **Node Version**: 20.x LTS

### Step 3: Environment Variables

1. Go to Settings → Environment Variables
2. Add production variables:

```bash
NEXT_PUBLIC_APP_NAME=CarHub
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

3. Click "Save"

### Step 4: Deploy

```bash
# Push to main branch
git push origin main

# Vercel automatically triggers deployment
# View progress at https://vercel.com/dashboard
```

### Vercel CLI (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from command line
vercel deploy --prod

# View logs
vercel logs <deployment-url>
```

### Preview Deployments

Every pull request automatically gets a preview deployment:

1. Create PR on GitHub
2. Vercel bot comments with preview URL
3. Click to see changes before merging

---

## 🐳 Docker Deployment

### Build and Push to Registry

#### Docker Hub

```bash
# Build image
docker build -t yourusername/carhub:latest .

# Login to Docker Hub
docker login

# Push image
docker push yourusername/carhub:latest

# Pull and run
docker run -p 3000:3000 yourusername/carhub:latest
```

#### GitHub Container Registry

```bash
# Login to GitHub Container Registry
docker login ghcr.io -u USERNAME

# Build and tag
docker build -t ghcr.io/USERNAME/carhub:latest .

# Push
docker push ghcr.io/USERNAME/carhub:latest
```

### Docker Compose Deployment

```bash
# Production docker-compose.yml
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f carhub

# Stop services
docker-compose down
```

---

## ☁️ AWS

### Using AWS App Runner (Simplest)

```bash
# 1. Create repository on GitHub
# 2. Go to AWS App Runner Console
# 3. Click "Create service"
# 4. Select GitHub repository source
# 5. Choose repository and branch
# 6. Configure settings
# 7. Create service

# Service URL will be provided
```

### Using AWS ECS

```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name carhub

# 2. Build and push image
docker build -t carhub:latest .
docker tag carhub:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/carhub:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/carhub:latest

# 3. Create ECS task definition
# 4. Create ECS service
# 5. Configure load balancer
# 6. Monitor and scale
```

### Using AWS Lightsail

```bash
# 1. Create instance
# 2. SSH into instance
# 3. Install Docker
# 4. Clone repository
# 5. Run docker-compose up
# 6. Configure domain
```

### Environment Variables on AWS

**For App Runner**:
1. Go to Configuration → Environment variables
2. Add your variables
3. Save and redeploy

**For ECS**:
1. Create `.env` file or use Secrets Manager
2. Reference in task definition
3. Deploy

---

## 🌐 Google Cloud

### Using Cloud Run (Simplest)

```bash
# 1. Set up Google Cloud project
gcloud projects create carhub-app
gcloud config set project carhub-app

# 2. Build image
gcloud builds submit --tag gcr.io/carhub-app/carhub

# 3. Deploy to Cloud Run
gcloud run deploy carhub \
  --image gcr.io/carhub-app/carhub \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Service URL will be provided
```

### Using Google App Engine

```bash
# Create app.yaml
cat > app.yaml << EOF
runtime: nodejs20
env: standard

env_variables:
  NODE_ENV: "production"
  NEXT_PUBLIC_APP_NAME: "CarHub"
EOF

# Deploy
gcloud app deploy
```

### Using Google Compute Engine

```bash
# 1. Create instance
gcloud compute instances create carhub-instance \
  --image-family=debian-11 \
  --image-project=debian-cloud \
  --machine-type=e2-medium

# 2. SSH and setup
gcloud compute ssh carhub-instance

# 3. Install Node.js and Docker
# 4. Deploy container
```

---

## 🏢 Heroku

### Using Heroku CLI

```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Create app
heroku create carhub-app

# 4. Add buildpack
heroku buildpacks:add heroku/nodejs

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail

# 7. Open app
heroku open
```

### Using Heroku GitHub Integration

```bash
# 1. Connect GitHub repo to Heroku
# 2. Enable automatic deploys
# 3. Choose branch to deploy from
# 4. Push changes to deploy
```

### Environment Variables on Heroku

```bash
# Set single variable
heroku config:set NEXT_PUBLIC_APP_NAME=CarHub

# Set multiple variables
heroku config:set \
  NODE_ENV=production \
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# View variables
heroku config

# Remove variable
heroku config:unset VARIABLE_NAME
```

---

## 🖥️ Self-Hosted

### Ubuntu/Debian Server

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Update system
sudo apt update
sudo apt upgrade -y

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Install pnpm
npm install -g pnpm

# 5. Clone repository
git clone https://github.com/Mostafa-SAID7/CarHub.git
cd CarHub

# 6. Install dependencies
pnpm install

# 7. Build application
pnpm build

# 8. Start application
pnpm start

# Or use PM2 for process management
sudo npm install -g pm2
pm2 start "pnpm start" --name carhub
pm2 save
pm2 startup
```

### Using Nginx as Reverse Proxy

```bash
# Install Nginx
sudo apt install -y nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/carhub

# Add configuration:
upstream carhub {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://carhub;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/carhub /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Enable HTTPS with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Using Docker on Server

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Clone repository
git clone https://github.com/Mostafa-SAID7/CarHub.git
cd CarHub

# 3. Build image
docker build -t carhub:latest .

# 4. Run container with docker-compose
docker-compose up -d

# 5. Configure domain/SSL with Nginx
# (see Nginx section above)
```

---

## 🔄 CI/CD Setup

### GitHub Actions (Already Configured)

The project includes GitHub Actions workflow (`.github/workflows/ci.yml`):

```yaml
# Workflow runs on:
# - Push to main/develop
# - Pull requests to main/develop

# Jobs:
# 1. Lint & Type Check
# 2. Build
# 3. Test
# 4. Docker Build
```

### GitHub Actions Deployment

Add deployment workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Other CI/CD Providers

#### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:20-alpine
  script:
    - npm install -g pnpm
    - pnpm install
    - pnpm build
  artifacts:
    paths:
      - .next

deploy:
  stage: deploy
  script:
    - echo "Deploying..."
    - # Add your deploy command
  only:
    - main
```

#### CircleCI

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  build:
    docker:
      - image: node:20
    steps:
      - checkout
      - run:
          name: Install pnpm
          command: npm install -g pnpm
      - run:
          name: Install dependencies
          command: pnpm install
      - run:
          name: Build
          command: pnpm build
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics

Already integrated. View at:
1. Vercel Dashboard
2. Your project
3. Analytics tab

### Error Tracking

Consider adding error tracking:

```bash
# Sentry
npm install @sentry/nextjs

# LogRocket
npm install logrocket
```

### Performance Monitoring

Use Web Vitals:

```bash
# Already included in Next.js
# View at Vercel Analytics dashboard
```

---

## 🔒 Security Checklist

Before production deployment:

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] Secrets not in code
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Firewall configured
- [ ] Backups enabled
- [ ] Monitoring setup
- [ ] Error logging enabled

---

## 🚨 Rollback Procedures

### Vercel

```bash
# Revert to previous deployment
vercel rollback

# Or manually trigger old deployment
```

### Docker

```bash
# Revert to previous image
docker run -p 3000:3000 carhub:previous-tag

# Or update docker-compose.yml and restart
```

### Self-Hosted with Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Restart application
pm2 restart carhub
```

---

## 📈 Post-Deployment

After deployment:

1. **Verify**: Test all functionality
2. **Monitor**: Watch for errors/performance issues
3. **Optimize**: Address any performance bottlenecks
4. **Update**: Keep dependencies up-to-date
5. **Backup**: Set up regular backups
6. **Security**: Scan for vulnerabilities

---

## 🔗 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [AWS Documentation](https://aws.amazon.com/documentation)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com)
- [Docker Documentation](https://docs.docker.com)
- [Nginx Documentation](https://nginx.org/en/docs)

---

## 📞 Deployment Issues?

- Check deployment logs
- Review environment variables
- Verify domain/DNS configuration
- Check firewall rules
- Review error tracking service
- Open GitHub issue with details

---

**Last Updated**: 2024
