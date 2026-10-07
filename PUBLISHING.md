# How to publish an article

For editors. No coding needed. Before you start, the article must have **finished blind peer review**.

> **Never put drafts, reviews or student submissions in this repository.** It is public. Keep them in Google Docs or email until they are final.

## Before you begin: collect these

| Item | Rule |
|---|---|
| Final text | Reviewed and approved |
| Author profile | One file per author (see "Add a new author") |
| Topic | Pick one: Constitutional Law, Human Rights, International Law, Technology and Law, Legal Education |
| Type | Article, Case summary, Commentary or Opinion |
| Summary | 1 or 2 sentences, under 400 characters |
| Cover image | 1200 x 630 pixels, JPG, under 200 KB. Only images you made, or free-to-use ones (Unsplash, Pexels, Canva) |
| Image description | A short sentence describing the image |

## Way A: the form editor (easiest, after one-time setup)

1. Open https://app.pagescms.org and sign in with the team GitHub account.
2. Choose this repository, then **Articles**, then **Add an entry**.
3. Fill in the form and paste the article text.
4. Click **Save**. The site updates in 1 to 2 minutes.

If the form editor is not set up yet, use Way B.

## Way B: the GitHub website (always works)

1. Upload the cover image: open the folder `src/assets/covers`, click **Add file**, then **Upload files**, then **Commit changes**.
2. Open `templates/article-template.md` and copy all of it.
3. Open the folder `src/content/articles`, click **Add file**, then **Create new file**.
4. Name it with lowercase words joined by dashes, ending in `.md`, for example `my-first-article.md`. This becomes the web address.
5. Paste the template. Change every line at the top, then write the article below the second `---` line.
6. Click **Commit changes**. The site updates in 1 to 2 minutes.

If something is wrong, the site will not update. Open the **Actions** tab on GitHub to see a red cross and the reason, usually a mistyped author or topic name.

## Add a new author

Copy `templates/author-template.md` into `src/content/authors/` and name it `firstname-lastname.md`. The file name is what you write in the article's `authors:` line. For a photo, upload a square image to `src/assets/authors` and add the `photo:` line.

## Add a new topic

Copy any file in `src/content/topics/`, rename it, and change the name and description. Keep topics few and broad.

## Feature (pin) an article

Set `featured: true` in the article. The front page shows up to three featured articles, newest first. Set older ones back to `false` when you pin new ones.

## Update "Most read"

Once a month, look at the visitor numbers (see the plan, step on analytics). Then edit `src/data/most-read.json` and list the article file names without `.md`, most read first. Four or five is enough.

## Remove an article

Delete its file in `src/content/articles`. GitHub keeps the history, so it can be restored.

## Filters

Readers can filter the article list by topic, type, year and search words on the **Articles** page. This works from the data you already enter, so nothing extra is needed.
