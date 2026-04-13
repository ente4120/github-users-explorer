# GitHub Users Explorer

<img src="public/cat_head_black.svg" width="80" height="80" alt="App Icon" />

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white)

A React + TypeScript application for browsing GitHub users with real-time filtering, pagination, and a GitHub-inspired UI.

---

## Tech Stack

| Library | Role |
|---|---|
| **React 19** | UI library |
| **TypeScript** | Static typing |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first CSS |
| **React Router v7** | Routing + URL-persisted state |
| **Axios** | HTTP client |

---

## Quick Start

### Prerequisites
- Node.js v16+
- npm

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
```

### Docker

```bash
docker-compose up --build   # http://localhost:8080
```

Or manually:

```bash
docker build -t github-users-explorer .
docker run -p 8080:80 github-users-explorer
```

---

## Features

**Browsing & Pagination**
- Previous / Next navigation with page number and item range (`items 1–10`)
- Page and per-page size persisted in URL (`?page=2&per_page=25`)
- Configurable results per page: 10, 25, 50, 100, 200

**Filtering**
- Real-time, case-insensitive search by username
- Client-side filtering via `useMemo`
- Filter auto-resets on page or per-page change

**Loading & Error States**
- Spinner on initial load
- Previous page stays visible (dimmed) while next page loads
- Error banner with "Try again" retry button

**User Cards**
- Avatar, username, link to GitHub profile
- Color-coded type badge — green for User, yellow for Organization

**Docker**
- Multi-stage build: `node:20-alpine` → `nginx:alpine`
- React Router deep-link support via Nginx `try_files`

---

## Project Structure

```
src/
├── components/
│   ├── UserCard.tsx
│   ├── UserList.tsx
│   ├── FilterInput.tsx
│   ├── LoadingSpinner.tsx
│   ├── EmptyState.tsx
│   └── index.ts
├── pages/
│   └── Home.tsx
├── services/
│   ├── githubAPI.ts
│   └── index.ts
├── hooks/
│   ├── useGitHubUsers.ts
│   └── index.ts
├── types/
│   ├── github.ts
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx

public/
├── cat_head_white.svg    # Navbar icon
└── cat_head_black.svg    # Browser tab favicon

Dockerfile
docker-compose.yml
index.html
package.json
tailwind.config.js
tsconfig.json
vite.config.js
```

### Component Hierarchy

```
App → Home → Header (navbar)
           → FilterInput + per-page selector
           → LoadingSpinner (initial load)
           → EmptyState     (no filter results)
           → UserList → UserCard (× n)
           → Pagination bar
```

---

## API Reference

**Endpoint**: `https://api.github.com/users`

**Example request**:
```
https://api.github.com/users?per_page=200&page=1&since=0
```

| Parameter | Description |
|-----------|-------------|
| `per_page` | Results per page (1–200, default 10) |
| `page` | Page number (1-based) |
| `since` | User ID offset for pagination |

> **Pagination limitation**: The GitHub API does not support true page-based pagination. It uses a `since` parameter — a user ID cursor that returns users whose ID is *greater than* the given value. User IDs on GitHub are not contiguous (accounts get deleted, IDs are skipped), so this app approximates pages by calculating `since = (page - 1) * perPage`. This means results may have gaps or slight inconsistencies between pages, and jumping to a specific page number is not accurate. It is cursor-based navigation dressed as page numbers.

> **Rate limit**: The GitHub API allows 60 unauthenticated requests per hour per IP. If you see errors after browsing many pages, wait a few minutes and try again.

**Response sample**:
```json
[
  {
    "login": "torvalds",
    "id": 1,
    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    "html_url": "https://github.com/torvalds",
    "type": "User"
  }
]
```

---

## API Service — `src/services/githubAPI.ts`

| Export | Description |
|--------|-------------|
| `GitHubUser` | User object from the API |
| `APIError` | Standardized error type |
| `fetchUsers(page, perPage)` | Fetch one page of GitHub users |

---

## Custom Hook — `src/hooks/useGitHubUsers.ts`

Manages all data fetching, pagination, filtering, and URL state.

```typescript
const {
  users,          // Filtered list for current page
  loading,
  error,
  page,
  hasNext,
  hasPrev,
  goNext,
  goPrev,
  perPage,
  setPerPage,
  from,           // First item index on current page
  to,             // Last item index on current page
  retry,
  filterText,
  setFilterText,
} = useGitHubUsers()
```

> **Virtual / Infinite Scroll ready** — `hasNext` and `goNext` are all that's needed. To switch: accumulate pages instead of replacing, and call `goNext` on scroll-to-bottom.

> **Note on React Router**: The app uses React Router solely for `useSearchParams` to persist `page` and `per_page` in the URL. There is only one route. A lighter alternative would be managing `window.location.search` directly, but `useSearchParams` keeps the code clean and idiomatic.

---

## Steps of Build

1. Vite + React + Tailwind CSS initialized ✅
2. Folder structure created ✅
3. API service layer — `githubAPI.ts` ✅
4. Custom hook — `useGitHubUsers.ts` ✅
5. Components built — `UserCard`, `UserList`, `FilterInput`, `LoadingSpinner`, `EmptyState` ✅
6. Pagination — Previous/Next, page number, URL params, filter reset on navigation ✅
7. Filtering — real-time, case-insensitive, clears on page/size change ✅
8. Final refinements — retry button, loading UX, per-page selector, code cleanup ✅
9. Docker setup — multi-stage build, Nginx, React Router support ✅
10. Final documentation ✅
