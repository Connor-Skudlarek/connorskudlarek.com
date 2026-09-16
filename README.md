# connorskudlarek.com

Personal site and portfolio. Next.js 15 with Tailwind CSS v4, exported as a
fully static site and served by Apache on a Lightsail instance.

Positioned around semiconductor equipment work plus software, aimed at roles
where manufacturing and hardware context is an advantage. Palette is
blue-forward and deliberately reads as an engineering tool rather than a
personal blog; every color pair clears WCAG AA on small text.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm run og           # regenerate public/og.png (the link preview card)
```

## Deploying

```bash
npm run deploy
```

That builds the site, uploads it as a new timestamped release, flips the
`current` symlink Apache serves from, prunes old releases, and checks that the
live pages return 200. Pass `-SkipBuild` to redeploy the existing `out/`.

## Server

A Debian instance on AWS Lightsail running Apache. The site is static files, so
there is no application process to supervise.

Each deploy lands in a timestamped release directory and goes live by pointing a
`current` symlink at it — atomic, no Apache reload, never a half-updated site.
The last five releases are kept, so rollback is re-pointing the symlink at an
older one. TLS is a Let's Encrypt certificate renewed on a schedule by Bitnami's
`lego` client.

### Configuration

`scripts/deploy.ps1` reads three environment variables and refuses to run
without them:

| Variable | Meaning |
| --- | --- |
| `DEPLOY_SERVER` | `user@host` for SSH |
| `DEPLOY_KEY` | path to the SSH private key (restricted permissions) |
| `DEPLOY_ROOT` | directory on the server that holds `releases/` and `current` |

### What changed in August 2026

The site used to be a `next start` process that Apache reverse-proxied to. That
process had been started by hand in an SSH session and had survived since 2024
with nothing supervising it, so any reboot would have taken the site down until
someone noticed. It is now a static export, which removes the process, the
proxy, and a meaningful share of the instance's memory.

A `wafer-wizards.` subdomain used to proxy to a port where nothing was
listening. It now redirects to the case study page.

## Layout

```
app/              routes; one directory per page
components/       shared UI, one component per section of the home page
lib/data.ts       all site copy and project data — edit content here, not in JSX
lib/risk.ts       Monte Carlo simulation behind /risk
scripts/          deploy and OG image generation
```

Content lives in `lib/data.ts` so that changing what the site says never means
hunting through markup.

## Possible next steps

- A GitHub Actions workflow to deploy on push, which needs the SSH key stored as
  a repository secret.
