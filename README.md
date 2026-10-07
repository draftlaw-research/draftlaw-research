# DraftLaw Research website

Open legal scholarship platform. Built with [Astro](https://astro.build), hosted free on GitHub Pages.
Articles, authors and topics are plain text files, so editors can publish without coding.

## Run it on your computer

You need **Node 22.12 or newer** (https://nodejs.org).

```bash
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # makes the final site in dist/
npm run preview    # look at the built site
```

## What is where

| Path | What it is |
|---|---|
| `src/content/articles/` | One `.md` file per article |
| `src/content/authors/` | One `.md` file per author (their profile page) |
| `src/content/topics/` | One `.md` file per topic (a section of the site) |
| `src/assets/covers/` | Article cover images |
| `src/data/most-read.json` | The "Most read" list, updated by hand |
| `src/config.ts` | Site name, email, menu |
| `src/styles/global.css` | All colours and fonts (see the variables at the top) |
| `src/pages/` | The page layouts |
| `templates/` | Copy-and-fill templates for articles and authors |
| `PUBLISHING.md` | Step-by-step guide for editors |
| `_internal/` | **Not committed.** Demo, source documents and plans |

## Put it online (GitHub Pages)

1. Create a free GitHub organisation, for example `draftlaw-research`.
2. Create a **public** repository named exactly `draftlaw-research.github.io` (organisation name + `.github.io`).
   This name makes the site open at the root of the address. Any other name puts the site under `/repo-name/`, and the links will break until the custom domain is connected.
3. Push this project:
   ```bash
   git init -b main
   git add .
   git status        # check that _internal/, node_modules/ and dist/ are NOT listed
   git commit -m "First version"
   git remote add origin https://github.com/draftlaw-research/draftlaw-research.github.io.git
   git push -u origin main
   ```
4. On GitHub open **Settings > Pages** and set **Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the site. Open the **Actions** tab to watch it.
5. Buy the domain, then in **Settings > Pages > Custom domain** enter it and tick **Enforce HTTPS** once available. DNS steps are in the plan.

## When the real domain is ready

Change it in three places: `astro.config.mjs` (`site`), `src/config.ts` (`url`) and `public/robots.txt`.

## Before launch checklist

- [ ] Delete the sample articles, sample authors and the placeholder covers (`columns`, `circuit`, `balance`, `meridians`, `arches`, `layers`). Keep `default.jpg`.
- [ ] Update `src/data/most-read.json` (an empty list hides the block).
- [ ] Check the About page text and the contact email.
- [ ] Decide the copyright wording in `src/config.ts` (`rights`).
- [ ] Add a short privacy note if you add analytics or a newsletter.
- [ ] Replace `public/og-default.jpg` if you want a different default share image.
- [ ] Check `.pages.yml` against https://pagescms.org/docs if you use the form editor.

## Notes

- The site works without any server and has almost no JavaScript (only the article filters and the copy-citation button).
- Fonts (Source Serif 4, Inter) are installed with the project, so visitors do not contact Google.
- Each article page carries scholarly metadata (`citation_*` tags and JSON-LD) so reference tools can read it.
- Pages print cleanly: menu and footer are hidden when printing.
