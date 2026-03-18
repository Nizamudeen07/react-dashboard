# AdminDashboard

A production-ready admin dashboard built with modern React tools, focusing on **scalability, performance, and clean architecture**.

---

## 🌐 Live Demo

https://react-admin-dashboardalgobiz.netlify.app/

## 📦 GitHub Repository

https://github.com/Nizamudeen07/react-dashboard

---

# 📌 Objective

This project demonstrates:

* Scalable frontend architecture
* Efficient API integration
* Performance optimization techniques
* Clean and maintainable code practices
* Production-ready deployment

---

# 🛠️ Tech Stack

* React 18
* Vite 5
* Tailwind CSS 4
* React Router DOM 6
* TanStack Query 5
* Axios

---

# 🧠 Architecture Decisions

### 🔹 Why TanStack Query?

TanStack Query is used for:

* Server state management
* Automatic caching
* Background refetching
* Request deduplication

This significantly reduces manual state handling and improves performance.

---

### 🔹 API Layer Separation

* Centralized API logic in `src/services/api.js`
* Avoids API calls inside UI components
* Improves maintainability and reusability

---

### 🔹 Custom Hooks

* `useUsers.js` → handles API logic
* `useDebounce.js` → improves search performance

Keeps UI components clean and focused.

---

### 🔹 Scalable Structure

```text
components/ → reusable UI & feature components  
pages/      → route-level components  
hooks/      → custom hooks  
services/   → API layer  
```

---

# 🧠 Why This Architecture?

The application follows **separation of concerns**:

* UI Layer → Components
* Logic Layer → Hooks
* Data Layer → Services

Benefits:

* Easy scalability
* Better maintainability
* Reusable logic
* Cleaner codebase

---

# ⚙️ Features

## 📊 Dashboard

* Summary cards
* Activity visualization
* Recent users list

---

## 👥 Users Management

* User listing (responsive table)
* User detail modal
* Pagination
* Debounced search

---

## 🔍 Search

* Filters results dynamically
* Uses debounce to reduce API calls

---

## 📄 Pagination

* Efficient data fetching
* Avoids loading large datasets

---

## ⚠️ Error Handling

* Global Error Boundary
* API error handling
* User-friendly messages

---

## ⏳ Loading States

* Skeleton loaders
* Spinners for async operations

---

## 📱 Responsive Design

* Mobile-friendly layout
* Sidebar overlay for smaller screens

---

# ⚡ Performance Optimizations

* Code splitting using lazy loading
* Debounced search input
* Memoization using `useMemo` and `useCallback`
* Query caching via TanStack Query
* Avoided unnecessary re-renders

---

# 🔗 API Integration

Base URL:
https://dummyjson.com

Endpoints used:

* `/users?limit=10&skip=0`
* `/users/search?q=keyword&limit=10&skip=0`
* `/users/:id`

---

# ⚔️ Challenges & Solutions

### 1. Excess API Calls

Solved using debounced search and query caching

### 2. State Management Complexity

Solved using TanStack Query instead of manual state

### 3. Route Refresh Issues

Handled using Netlify SPA redirect configuration

---

# 🧪 Assumptions & Trade-offs

* Used a public API (no authentication required)
* Pagination preferred over infinite scroll for better control
* Focused more on functionality than UI design
* Frontend-only implementation

---

# 🚀 Deployment

Deployed using **Netlify**

### Build Settings

* Build command: `npm run build`
* Publish directory: `dist`

### SPA Routing Fix

Configured using `netlify.toml` to handle refresh on nested routes.

---

# 💻 Local Setup

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

# 📈 Future Improvements

* Sync search & pagination state with URL
* Add authentication system
* Unit & integration testing
* Role-based access control
* List virtualization for large datasets

---

# ✅ Assignment Checklist

* [x] Dashboard UI
* [x] Search with debounce
* [x] Pagination
* [x] API integration
* [x] Error handling
* [x] Performance optimization
* [x] Deployment

---

# 👨‍💻 Author

**Nizamudeen N**
Junior Software Engineer
2+ Years Experience

---
