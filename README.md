# Janpol Hidalgo Portfolio

An Astro portfolio with MDX notes, live API routes, and a Typst-generated resume.

## Commands

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm test
pnpm run build
pnpm run preview
pnpm run resume
```

The development server runs at `http://localhost:4321`. Because the Vercel adapter does not support `astro preview`, `pnpm run preview` uses the pinned Vercel CLI and requires a Vercel login. `pnpm run resume` compiles `content/resume.typ` into `public/Hidalgo-CV-Typst.pdf`; install Typst first if the command is unavailable. Vercel is the deployment target and reads the explicit Astro preset from `vercel.json`.

## Structure

- `src/pages` contains Astro routes and API endpoints.
- `src/components` contains server-rendered UI and small browser scripts.
- `content/notes` contains MDX notes loaded through Astro content collections.
- `content/resume.typ` is the editable Typst source for the generated resume PDF.
- `DESIGN.md` records the interface system and reference-derived decisions.
