# GitHub Users Explorer 🔍

A React application that displays GitHub users with filtering and pagination functionality.

## 📋 Project Status

### Completed Steps ✅
- **Step 1**: Vite + React + Tailwind CSS initialized
- **Step 2**: Folder structure created
- **Dependencies**: React Router, Axios installed

### In Progress 🔄
- Step 3: API service layer
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
│   ├── UserList.jsx
│   ├── UserCard.jsx
│   ├── FilterInput.jsx
│   ├── Pagination.jsx
│   └── LoadingState.jsx
│
├── pages/              # Page components
│   └── Home.jsx
│
├── services/           # API service layer
│   └── githubAPI.js
│
├── hooks/              # Custom React hooks
│   └── useGitHubUsers.js
│
├── App.jsx             # Main App component with routing
├── index.css           # Tailwind CSS setup
└── main.jsx            # React entry point

public/                 # Static assets
Dockerfile              # Docker configuration
README.md              # This file
```

---

## 🛠️ Tech Stack

- **React 18** - UI library
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

## 📝 Development Workflow

Each feature will be:
1. ✏️ Implemented step-by-step
2. 📖 Documented in README
3. 💾 Committed to Git with clear messages
4. ✅ Tested before moving to next step

---

## 📚 Component Architecture

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

## 📋 Commit Strategy

Each step will have a dedicated commit:
```
Step 1: Initial Vite + React + Tailwind setup
Step 2: Folder structure and dependencies
Step 3: API service layer
Step 4: Custom hook implementation
... and so on
```

---

## 🤝 Contributing

Follow the step-by-step implementation plan. Each feature should be:
- Isolated in its own branch/commit
- Fully tested
- Documented
- Reviewed before merge

---

## 📄 Original Requirements

See `Task.md` for the original assignment requirements.

---

## 📞 Support

For questions about the project structure or implementation approach, refer to this README or the original Task.md file.

---

**Last Updated**: Step 2 - Folder Structure Setup ✅
