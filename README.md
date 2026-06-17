# jeanloui.dev

My personal portfolio.

🚀 **Live:** https://jeanloui.dev


## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

## Deployment

Pushing to `main` triggers the [GitHub Actions workflow](./.github/workflows/main.yml), which builds
the static export and publishes `out/` to the `gh-pages` branch. The custom domain is configured via
[`public/CNAME`](./public/CNAME), and `public/.nojekyll` ensures the `_next/` assets are served.
