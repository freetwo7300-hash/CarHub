# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in CarHub, please email security@example.com instead of using the issue tracker.

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if applicable)

We will acknowledge receipt of your report within 48 hours and provide an update on our progress within 5 days.

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes |
| Previous | ✅ Limited |
| Older   | ❌ No |

## Security Best Practices

### For Users
- Keep dependencies updated
- Use HTTPS only
- Enable two-factor authentication
- Never share API keys or tokens

### For Contributors
- Follow code review guidelines
- Use authenticated sessions
- Validate all user input
- Use parameterized queries (when applicable)
- Report vulnerabilities responsibly

## Security Headers

CarHub implements:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security (on HTTPS)

## Dependency Updates

We use Dependabot to automatically:
- Check for vulnerable dependencies
- Create pull requests for updates
- Alert on security issues

See `.github/dependabot.yml` for configuration.
