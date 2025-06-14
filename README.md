# Personal Finance App

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

<!-- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel. -->

## Tech Stack

- Next.js (React.js)
- TypeScript
- Shadcn UI library
- TailwindCSS
- Xstate/store - for state management
- Tanstack query - data fetching
- React-Hook-Form

### File naming convention

- File name case is kebab-case, example `jar-fill.tsx`

### Making changes

- Create a branch for your changes, then push and create a PR. DO NOT PUSH TO MAIN BRANCH DIRECTLY!

## Folder structure

- Watch this video for more clarity [Folder structure explanation video](link-to-video)

```
  .
  |-src/
  | |-app/                  # App pages
  |   |-overview/           # Single page
  |     |-page.tsx          # Single page root
  |     |-ui/               # Single page specific components
  |     |-constants/        # Single page specific constants (can equally be a single constants.ts file)
  |     |-utils/            # Single page specific utils (can equally be a single utils.ts file)
  |     |-[others]/         # Single page specific resource file or folder, as specified above
  | |-shared/               # Shared resources like components, hooks, constants, routes, etc...
  |   |-components/         # Shared components
  |     |-ui/               # Shared UIs (mostly used by shadcn)
  |     |-form/             # Shared form components
  |   |-data/               # Shared data resources, e.g.:
        |-user.data.ts      # Specific data resource, containing useUserQuery, etc.
  |   |-api/                # Shared APIs
  |     |-user.api.ts       # User APIs, containing an export userAPI object.
  |   |-constants/          # Shared constants
  |   |-icons/              # Shared icons
  |   |-utils/              # Shared utils
  |   |-lib/                # Shared lib
  |   |-hooks/              # Shared hooks
  |   |-types/              # Shared type definitions
  |   |-routes/             # Shared routes
  |   |-[etc]/              # Any other shared resources with appropriate name
  | |-widgets/              # For one-time-use components, like header, footer, sidebar, etc.
  |   |-footer/             # For app footer
  |   |-header/             # For app header
  |   |-sidebar/            # For app sidebar
```
