# Contributing to CarHub

Thank you for considering contributing to CarHub! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## 📖 Code of Conduct

We are committed to providing a welcoming and inspiring community. Please read and follow our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them
- Focus on constructive criticism
- Report violations to maintainers

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/CarHub.git
cd CarHub
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/Mostafa-SAID7/CarHub.git
```

### 4. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 5. Install Dependencies

```bash
pnpm install
```

### 6. Start Development Server

```bash
pnpm dev
```

---

## 💻 Development Workflow

### 1. Sync with Upstream

Always sync before starting work:

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Make Changes

Follow code standards (see below) while making changes.

### 3. Test Locally

```bash
# Run linter
pnpm lint

# Verify build
pnpm build

# Test application
# Open http://localhost:3000
```

### 4. Commit Changes

Follow commit guidelines (see below).

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Open a PR on GitHub with a clear description.

---

## 🔍 Code Standards

### TypeScript

- Use TypeScript strict mode
- Add type annotations to functions
- Use meaningful type names
- Avoid `any` type when possible

```typescript
// ✅ Good
interface User {
  id: string
  name: string
  email: string
}

function getUserById(id: string): Promise<User | null> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Use TypeScript for props
- Add JSDoc comments for complex components

```typescript
// ✅ Good
interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

/**
 * Reusable card component
 */
export function Card({ title, children, className }: CardProps) {
  return (
    <div className={`p-4 rounded-lg border ${className}`}>
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  )
}

// ❌ Bad
export function Card(props: any) {
  return <div>{props.children}</div>
}
```

### Tailwind CSS

- Use utility-first approach
- Follow spacing scale
- Use dark mode classes
- Keep class names organized

```typescript
// ✅ Good
<button className="
  px-4 py-2
  bg-blue-600 text-white
  rounded-lg
  hover:bg-blue-700
  dark:bg-blue-500
  transition-colors
">
  Click
</button>

// ❌ Bad
<button style="background: blue; padding: 10px 20px;">
  Click
</button>
```

### File Organization

```
Feature Folder Structure:
- feature/
  ├── components/
  │   ├── FeatureCard.tsx
  │   └── FeatureList.tsx
  ├── utils/
  │   └── featureHelpers.ts
  ├── page.tsx
  └── types.ts
```

### Naming Conventions

- **Files**: `kebab-case.tsx` or `PascalCase.tsx` for components
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **Folders**: `kebab-case`

```typescript
// ✅ Good
const MAX_USERS = 100
interface UserData {}
const fetchUserData = () => {}
type Status = 'active' | 'inactive'

// ❌ Bad
const max_users = 100
interface user_data {}
const FetchUserData = () => {}
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): subject

body

footer
```

### Type

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build process, dependencies

### Scope

Specify the area affected:

```
feat(forum): add thread search
fix(events): correct date validation
docs(readme): update installation
```

### Subject

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at end
- Maximum 50 characters

### Examples

```
feat(forum): add thread search by category

fix(events): correct timezone handling in event dates

docs(styling): update Tailwind CSS guidelines

refactor(components): simplify card component logic
```

### Commit Commands

```bash
# Stage changes
git add .

# Commit with message
git commit -m "feat(forum): add thread search by category"

# Amend last commit
git commit --amend

# Rebase interactive
git rebase -i HEAD~3
```

---

## 🔄 Pull Request Process

### Before Submitting PR

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Verify your changes**
   ```bash
   pnpm lint
   pnpm build
   ```

3. **Test thoroughly**
   - Run dev server
   - Test all affected pages
   - Test responsive design
   - Test dark mode if applicable

4. **Update documentation**
   - Add/update relevant docs
   - Update README if needed
   - Add code comments

### PR Title

Follow commit message format:

```
feat(forum): add search functionality
fix(events): correct date validation
docs: update installation guide
```

### PR Description

```markdown
## Description
Brief explanation of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update

## Changes Made
- Added X functionality
- Fixed Y issue
- Updated Z documentation

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested in dark mode
- [ ] Tested in light mode

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

- Maintainers will review your PR
- Address feedback and comments
- Update your PR with new commits
- Once approved, maintainers will merge

---

## 🐛 Reporting Issues

### Before Reporting

- Check existing issues
- Search closed issues
- Review documentation
- Verify it's a real issue

### Issue Template

```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Issue occurs

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node version: v18.x.x
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox

## Screenshots
[Add screenshots if applicable]
```

---

## 📚 Documentation Guidelines

### Writing Documentation

- Use clear, simple language
- Include code examples
- Add helpful comments
- Keep sections organized
- Link to related docs

### File Naming

- Use `.md` extension
- Use `UPPER_SNAKE_CASE` for main files
- Use clear, descriptive names
- Keep hierarchy logical

### Example

```markdown
# Component Title

Brief description.

## Overview
More detailed explanation.

## Usage

### Basic Usage

\`\`\`typescript
// code example
\`\`\`

### Advanced Usage

\`\`\`typescript
// advanced code example
\`\`\`

## API Reference

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | Component name |

## See Also
- [Related docs](link)
```

---

## 🎯 Areas to Contribute

### High Priority

- [ ] Bug fixes
- [ ] Performance improvements
- [ ] Accessibility enhancements
- [ ] Documentation updates

### Feature Development

- [ ] Backend API integration
- [ ] Authentication system
- [ ] Database integration
- [ ] Advanced search
- [ ] Real-time features

### Quality

- [ ] Test coverage
- [ ] Type safety improvements
- [ ] Error handling
- [ ] Logging

---

## 🔗 Useful Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📞 Questions?

- Open a GitHub Discussion
- Check existing issues
- Review documentation
- Comment on related PRs

---

## ✨ Thank You!

We appreciate your contributions to making CarHub better. Every contribution, no matter how small, makes a difference!

---

**Last Updated**: 2024
