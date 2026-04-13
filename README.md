# GitHub Users Explorer 🔍

A React application that displays GitHub users with filtering and pagination functionality.

## 📋 Project Status

### Completed Steps ✅
- **Step 1**: Vite + React + Tailwind CSS initialized
- **Step 2**: Folder structure created
- **Step 3**: API service layer created (`githubAPI.js`)
- **Dependencies**: React Router, Axios installed

### In Progress 🔄
- Step 4: Custom hook for data fetching
- Step 5-8: Components & features
- Step 9: Docker setup
- Step 10: Final documentation

### Not Started ⏳
- Feature implementations

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   ├── FilterInput.tsx
│   ├── Pagination.tsx
│   └── LoadingState.tsx
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
├── App.tsx             # Main App component with routing
├── index.css           # Tailwind CSS setup
└── main.tsx            # React entry point

public/                 # Static assets
Dockerfile              # Docker configuration
README.md              # This file
tsconfig.json          # TypeScript configuration
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

## � API Service Layer

### File: `src/services/githubAPI.ts`

TypeScript API service handling all GitHub API interactions with proper error handling and type safety:

**Exported Types:**
- `GitHubUser` - Basic user object from API
- `GitHubUserProfile` - Extended user profile with detailed info
- `RateLimit` - API rate limit information
- `APIError` - Standardized error type

**Exported Functions:**

1. **`fetchUsers(page)`** - Fetch paginated list of GitHub users
   - Parameter: `page: number` (1-based page number)
   - Returns: `Promise<GitHubUser[]>`
   - Uses pagination with `since` parameter for efficient fetching

2. **`fetchUserProfile(username)`** - Fetch single user's detailed profile
   - Parameter: `username: string` (GitHub username)
   - Returns: `Promise<GitHubUserProfile>`
   - Useful for future user details page

3. **`checkRateLimit()`** - Check GitHub API rate limit status
   - Returns: `Promise<RateLimit>`
   - Helps monitor API usage

**Features:**
- ✅ Full TypeScript type safety
- ✅ Axios-based HTTP client with error handling
- ✅ Meaningful error messages with status codes
- ✅ GitHub API v3 headers
- ✅ Pagination support (10 users per page)
- ✅ Rate limit aware

---

### Custom Hook: `useGitHubUsers`
```javascript
// Returns: { users, filteredUsers, loading, error, page, filterText }
// Methods: { setFilterText, nextPage, prevPage }
```

### Component Hierarchy
```
App
└── Home Page
    ├── FilterInput
    ├── UserList
    │   └── UserCard (repeated for each user)
    ├── Pagination
    └── LoadingState/ErrorMessage
```

---

## 🔗 API Reference

**Endpoint**: `https://api.github.com/users`

**Parameters**:
- `per_page` - Number of users per page (10)
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

**Last Updated**: Step 3 - API Service Layer + TypeScript Setup ✅
