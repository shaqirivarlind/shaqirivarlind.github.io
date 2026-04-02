# Arlind Shaqiri — Portfolio

Personal portfolio and CV site for Arlind Shaqiri, Software Engineer based in Prishtina, Kosovo.

Built with Nuxt 4, Vue 3, TypeScript, and Vuetify. Deployed as a static site via GitHub Pages.

**Live:** [shaqirivarlind.github.io](https://shaqirivarlind.github.io)

## Static build

```bash
npm run generate
```

Output: `.output/public` (Nitro static preset).

## Deploy to GitHub Pages

This repo is a **user site** (`username.github.io`), so `nuxt.config.ts` uses `app.baseURL: '/'`. If you ever host under a **project URL** (`username.github.io/repo-name/`), set `app.baseURL` to `'/repo-name/'` instead.

### Option A — `gh-pages` branch (local)

```bash
npm install
npm run deploy
```

This runs `nuxt generate` then pushes `.output/public` to the `gh-pages` branch. In the repo: **Settings → Pages → Build and deployment → Branch: `gh-pages` / root**.

If you already generated and only want to upload:

```bash
npm run deploy:upload
```

### Option B — GitHub Actions

Use **Settings → Pages → Source: GitHub Actions**. Pushes to `main` run `.github/workflows/deploy-github-pages.yml` and publish the `generate` output (no `gh-pages` branch needed).
