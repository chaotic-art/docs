# Contributing to Chaotic Documentation

Thank you for your interest in contributing to Chaotic Documentation! This guide will help you get started with contributing to our public good NFT marketplace documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/chaotic-docs.git
   cd chaotic-docs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📖 Documentation Structure

Our documentation is organized into several key sections:

- **Getting Started** - Onboarding guides for new users
- **Basics** - Core concepts and fundamentals
- **Features** - Detailed feature documentation
- **Technical** - Developer resources and API documentation

## ✍️ Writing Guidelines

### Content Standards

- **Clear and Concise**: Write in clear, simple language
- **User-Focused**: Consider the reader's perspective and needs
- **Up-to-Date**: Ensure information is current and accurate
- **Accessible**: Use inclusive language and explain technical terms

### Markdown Style

- Use proper heading hierarchy (H1 → H2 → H3)
- Include code examples with proper syntax highlighting
- Add alt text for images and screenshots
- Use consistent formatting throughout

### Voice and Tone

Chaotic has a unique brand personality:
- **Chaotic Energy**: Unpredictable, surprising, never boring
- **Degen-Native**: Fluent Web3, embraces the culture
- **Meme-First**: Communication through humor when appropriate
- **Seriously Unserious**: Professional product, chaotic personality

## 🐛 Bug Reports

When reporting bugs in documentation:

1. **Search first** - Check if the issue already exists
2. **Be specific** - Include exact page URLs and error messages
3. **Provide context** - What were you trying to accomplish?
4. **Suggest fixes** - If you have ideas for improvements

## 💡 Feature Requests

For new documentation features:

1. **Check existing issues** - Avoid duplicates
2. **Describe the need** - Why is this feature important?
3. **Provide examples** - Show what you envision
4. **Consider scope** - Is this a small change or major addition?

## 🔄 Pull Request Process

### Before Submitting

- [ ] Test your changes locally
- [ ] Check for spelling and grammar errors
- [ ] Ensure links work correctly
- [ ] Follow the existing style and formatting
- [ ] Update the table of contents if needed

### Pull Request Guidelines

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/improve-ai-drops-docs
   ```
2. **Make your changes** with clear, descriptive commits
3. **Test thoroughly** - Run `npm run build` to verify
4. **Submit the PR** with a clear title and description

### PR Description Template

```markdown
## What does this PR do?
Brief description of the changes

## Why is this needed?
Explanation of the problem this solves

## How to test
Steps to verify the changes work correctly

## Screenshots (if applicable)
Visual proof of changes

## Checklist
- [ ] Documentation builds without errors
- [ ] Links are working correctly
- [ ] Content follows style guidelines
- [ ] Changes have been tested locally
```

## 🎨 Style Guide

### Code Examples

Always use proper syntax highlighting:

```typescript
// Good
export interface ChaoticConfig {
  apiUrl: string;
  chainId: number;
}
```

### Links

- Use descriptive link text (not "click here")
- Prefer relative links for internal pages
- Always test external links

### Images

- Use descriptive filenames
- Include alt text for accessibility
- Optimize images for web (WebP when possible)
- Place images in appropriate directories

## 📝 Content Types

### Tutorials

Step-by-step guides should:
- Start with clear objectives
- Include all prerequisites
- Provide complete code examples
- End with next steps or related content

### API Documentation

Technical documentation should:
- Include complete parameter lists
- Show request/response examples
- Document error cases
- Provide working code samples

### Concept Explanations

Educational content should:
- Start with the basics
- Build complexity gradually
- Use analogies when helpful
- Include visual aids where appropriate

## 🚀 Deployment

Documentation is automatically deployed when changes are merged to the `main` branch. The site is built using:

- **Framework**: Docus v4 (Nuxt-based)
- **Hosting**: [To be specified]
- **Build**: Static site generation
- **CDN**: Global content delivery

## 🤝 Community

Join our community to discuss documentation improvements:

- **Telegram**: [https://t.me/chaoticapp](https://t.me/chaoticapp)
- **X (Twitter)**: [https://x.com/ChaoticApp](https://x.com/ChaoticApp)
- **GitHub Discussions**: For longer-form discussions

## 📄 License

By contributing to Chaotic Documentation, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

We appreciate all contributors! Contributors will be recognized in:
- GitHub contributor graphs
- Release notes for significant contributions
- Community shoutouts

---

**Questions?** Open an issue or reach out to our community on Telegram. We're here to help make your contribution experience as smooth as possible!