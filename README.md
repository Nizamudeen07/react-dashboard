# AdminPulse

A responsive admin dashboard built with React, Vite, Tailwind CSS, React Router, TanStack Query, and Axios.

This project shows a dark admin UI with:

- Dashboard overview cards
- User management table
- Search with debounce
- Pagination
- User detail modal
- Error and empty states
- Netlify-ready SPA deployment

## Stack

- React 18
- Vite 5
- Tailwind CSS 4
- React Router DOM 6
- TanStack Query 5
- Axios

## Project Notes

- The UI has been migrated from CSS Modules to Tailwind CSS while keeping the same visual design.
- User data comes from `https://dummyjson.com/users`.
- Routing is configured as a single-page app, so direct refreshes on nested routes work on Netlify.

## Local Setup

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173`.

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Folder Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   ├── ui/
│   │   ├── ErrorBoundary.jsx
│   │   ├── Pagination.jsx
│   │   ├── Skeleton.jsx
│   │   └── Spinner.jsx
│   └── users/
│       ├── SearchBar.jsx
│       ├── UserModal.jsx
│       └── UserTable.jsx
├── hooks/
│   ├── useDebounce.js
│   └── useUsers.js
├── pages/
│   ├── Dashboard.jsx
│   ├── NotFound.jsx
│   ├── Placeholder.jsx
│   └── Users.jsx
├── services/
│   └── api.js
├── App.jsx
├── index.css
└── main.jsx
```

## Architecture

### Data Fetching

- `src/services/api.js` creates a shared Axios client.
- `src/hooks/useUsers.js` wraps API calls with TanStack Query.
- Pagination and search results are cached by query key.

### Routing

- `src/App.jsx` uses lazy-loaded routes.
- `src/components/layout/Layout.jsx` provides the shared sidebar and header shell.

### Styling

- Tailwind CSS 4 is enabled through `@tailwindcss/vite`.
- Global theme tokens, fonts, animations, and shared utilities live in [`src/index.css`](/Users/nizam/Downloads/admin-dashboard/src/index.css).
- Components use utility classes directly in JSX for the final design.

## Main Features

### Dashboard

- Summary metric cards
- Activity bar chart
- Recent users list

### Users

- Debounced search input
- Responsive table layout
- Pagination with ellipsis
- User profile modal

### UX

- Loading spinners and skeleton states
- Inline error handling
- Empty state for no search matches
- Mobile sidebar overlay

## API Endpoints Used

- `GET /users?limit=10&skip=0`
- `GET /users/search?q=keyword&limit=10&skip=0`
- `GET /users/:id`

Base URL: `https://dummyjson.com`

## Netlify Deployment

This repository is already configured for Netlify.

### Netlify build settings

- Build command: `npm run build`
- Publish directory: `dist`

### Config file

[`netlify.toml`](/Users/nizam/Downloads/admin-dashboard/netlify.toml) includes:

- build command
- publish directory
- SPA redirect rule for React Router

### Deploy from Netlify UI

1. Push this project to your Git provider.
2. In Netlify, choose `Add new site`.
3. Import the repository.
4. Netlify should read `netlify.toml` automatically.
5. Deploy the site.

### Deploy with Netlify CLI

```bash
npm run build
netlify deploy --prod --dir=dist
```

## Build Verification

Production build verified successfully with:

```bash
npm run build
```

## Future Improvements

1. Sync search and page state to the URL.
2. Add tests for table, pagination, and modal flows.
3. Add authentication if this becomes a real admin app.
