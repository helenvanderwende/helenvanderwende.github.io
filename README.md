# helenvanderwende.com

Portfolio site built with [Eleventy](https://www.11ty.dev/) and [Tailwind CSS](https://tailwindcss.com/), deployed to GitHub Pages at [helenvanderwende.com](https://helenvanderwende.com).

## Setup

1. **Clone the repo**

   ```sh
   git clone git@github.com:helenvanderwende/helenvanderwende.github.io.git
   cd helenvanderwende.github.io
   ```

2. **Install Node.js**

   This project pins its Node version in [.tool-versions](.tool-versions) (currently Node 24). If you use [asdf](https://asdf-vm.com/):

   ```sh
   asdf plugin add nodejs
   asdf install
   ```

   Any other Node version manager (nvm, fnm, etc.) works too — just match the version in `.tool-versions`.

3. **Install pnpm**

   ```sh
   brew install pnpm
   ```

4. **Install dependencies**

   ```sh
   pnpm i
   ```

   Sharp (used for image processing) needs to run a native build script. If pnpm blocks it, approve it once with:

   ```sh
   pnpm approve-builds
   ```

## Development server

```sh
pnpm serve
```

This runs Eleventy in watch/serve mode alongside the Tailwind CLI in watch mode, so both templates and CSS rebuild on save. The site will be available at the local URL Eleventy prints in the terminal (usually `http://localhost:8080`).

To produce a production build (used by the deploy workflow):

```sh
pnpm build
```

Output goes to `./dist`.

## Adding new images

Images live under `src/images/<category>`, where category is one of `digital`, `drawings`, or `paintings`. Each category maps to its own gallery page (`src/pages/digital.njk`, `drawings.njk`, `paintings.njk`).

To add a new piece:

1. Drop the image file into the matching folder, e.g. `src/images/paintings/new-painting.jpg`.
2. That's it — [src/js/images.js](src/js/images.js) globs each folder automatically, so no manual registration is needed. Restart `pnpm serve` if it was already running.

Behind the scenes, [src/js/gallery.js](src/js/gallery.js) generates responsive thumbnail + lightbox versions of each image at build time via `sharp` and `@11ty/eleventy-img`, so you can drop in full-size source images without resizing them yourself first.

## Git basics

A quick primer if you're new to git:

- **`git status`** — shows what's changed, staged, or untracked. Run this often; it's always safe.
- **`git pull`** — fetches and merges the latest changes from the remote (usually `main`) into your current branch.
- **Branches** keep changes isolated until they're ready to merge:
  ```sh
  git checkout -b my-feature   # create and switch to a new branch
  ```
- **Committing a change:**
  ```sh
  git add .                    # stage changes
  git commit -m "message"      # commit staged changes with a message
  git push                     # push your branch to the remote
  ```
- **Opening a PR:** once a branch is pushed, open a pull request on GitHub (or run `gh pr create` if you have the [GitHub CLI](https://cli.github.com/) installed) to merge it into `main`.
- **Getting back to `main`:**
  ```sh
  git checkout main
  git pull
  ```

Pushing to `main` triggers [.github/workflows/build.yml](.github/workflows/build.yml), which builds the site and deploys `dist/` to GitHub Pages.
