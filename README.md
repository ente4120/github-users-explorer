# GitHub Users Explorer 🔍

A React application that displays GitHub users with filtering and pagination functionality.

## 📋 Project Status

### Completed Steps ✅
- **Step 1**: Vite + React + Tailwind CSS initialized
- **Step 2**: Folder structure created
- **Step 3**: API service layer created (`githubAPI.ts`)
- **Step 4**: Custom hook created (`useGitHubUsers.ts`)
- **Step 5**: Components built (`UserCard`, `UserList`, `FilterInput`, `LoadingSpinner`, `EmptyState`)
- **Step 6**: Pagination implemented (Previous/Next buttons, page number, URL params, filter reset on navigation)
- **Step 7**: Filtering implemented (real-time, case-insensitive, clears on page change)
- **Dependencies**: React Router, Axios installed

- **Step 8**: Final refinements (retry button, loading UX, code cleanup, perPageOptions deduplication)

### In Progress 🔄
- Step 9: Docker setup
- Step 10: Final documentation

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   ├── FilterInput.tsx
│   ├── LoadingSpinner.tsx
│   └── EmptyState.tsx
│
├── pages/              # Page components
│   └── Home.tsx
│
├── services/           # API service layer
│   └── githubAPI.ts
│
├── hooks/              # Custom React hooks
│   └── useGitHubUsers.ts
│
├── types/              # TypeScript interfaces
│   └── github.ts
│
├── App.tsx             # Main App component with routing
├── index.css           # Global styles
└── main.tsx            # React entry point

public/                 # Static assets
README.md               # This file
tsconfig.json           # TypeScript configuration
```

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - JavaScript with static typing
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## ✨ Features (To Be Implemented)

### 1. Data Fetching ⏳
- Fetch GitHub users from: `https://api.github.com/users?per_page=10&page=1&since=0`
- Pagination support via `since` parameter
- Error handling for API failures

### 2. User Display ⏳
- Avatar (40x40px, rounded)
- Username from `login` field
- Clickable link to GitHub profile (`html_url`)
- Rendered as unordered list with proper styling

### 3. Filtering ⏳
- Real-time search by username (case-insensitive)
- Client-side filtering of currently loaded users
- Clear filter when changing pages

### 4. Pagination ⏳
- Display current page number
- "Previous" and "Next" buttons
- Disable "Previous" on page 1
- Disable buttons during loading
- Reset filter on page change

### 5. Loading & Error States ⏳
- "Loading users..." message during fetch
- Error message display for failed API calls
- "No users found" when filter returns empty
- Disabled navigation during loading

### 6. Docker Setup ⏳
- Dockerfile for containerization
- Multi-stage build for optimization

---

## 🗂️ API Service Layer

### File: `src/services/githubAPI.ts`

**Exported Types:**
- `GitHubUser` - User object from API
- `APIError` - Standardized error type

**Exported Functions:**

- **`fetchUsers(page, perPage)`** - Fetch a page of GitHub users
  - `page: number` — 1-based page number
  - `perPage: number` — results per page (1–200, default 10)
  - Returns: `Promise<GitHubUser[]>`

**Features:**
- ✅ Full TypeScript type safety
- ✅ Axios-based HTTP client with error handling
- ✅ Meaningful error messages with status codes
- ✅ Configurable page size (1–200)

---

## 🎣 Custom Hook

### File: `src/hooks/useGitHubUsers.ts`

Manages all data fetching, pagination, and filtering state. Syncs `page` and `per_page` with URL search params.

**Returns:**
```typescript
{
  users: GitHubUser[]        // Filtered list for current page
  loading: boolean
  error: APIError | null
  page: number               // Current page (from URL)
  hasNext: boolean
  hasPrev: boolean
  goNext: () => void
  goPrev: () => void
  perPage: number            // Current page size (from URL)
  setPerPage: (n: number) => void
  from: number               // First item index on current page
  to: number                 // Last item index on current page
  filterText: string
  setFilterText: (s: string) => void
}
```

**Features:**
- ✅ Page and perPage persisted in URL (`?page=2&per_page=25`)
- ✅ Client-side filtering with `useMemo`
- ✅ Filter resets on page or perPage change
- ✅ Stale request cancellation via cleanup flag

**Usage:**
```typescript
const { users, loading, error, page, goNext, goPrev } = useGitHubUsers()
```

---

### Component Hierarchy
```
App → Home → Header
           → FilterInput + per-page selector
           → LoadingSpinner (while fetching)
           → EmptyState     (no filter results)
           → UserList → UserCard (× n)
           → Pagination bar
```

---

## 🔗 API Reference

**Endpoint**: `https://api.github.com/users`

**Parameters**:
- `per_page` - Number of users per page (1–200, default 10)
- `page` - Page number (1-based)
- `since` - User ID offset for pagination (0-based)

**Response Sample**:
```json
[
  {
    "login": "torvalds",
    "id": 1,
    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    "html_url": "https://github.com/torvalds",
    ...
  }
]
```

---

## 🎨 Styling Guidelines

- Use **Tailwind CSS utility classes** for all styling
- Follow responsive design principles
- Support light/dark mode (if using Tailwind extensions)
- Maintain consistency with component styling

---

## 🐳 Docker

Docker setup will include:
- Node.js base image
- Multi-stage build (build → serve)
- Optimized image size
- Environment configuration

*Implementation in Step 9*

---

**Last Updated**: Step 5 - Components Built ✅
