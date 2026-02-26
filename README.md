# ✅ Task Tracker — Checklist App

Developed by Nefise Genç as a Web Development course project.

## 🚀 Technologies Used

| Technology | Purpose |
|-----------|------|
| **React 18** | UI library (with Vite) |
| **Tailwind CSS 3** | Styling / design |
| **localStorage** | Persistent data storage in the browser |

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx      # Task add & update form
│   ├── TaskItem.jsx      # Single task row
│   ├── TaskList.jsx      # Task list
│   └── TaskFilter.jsx    # Search & filter bar
├── interfaces/
│   └── Task.js           # Task data model & constants
├── pages/
│   └── HomePage.jsx      # Home page (CRUD management)
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Installation

```bash
npm install
npm run dev
```

## 🌐 Deploying with Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

## 🔑 Features (CRUD)

- ➕ **Create** — Add tasks with title, description, priority, category, and due date
- 📋 **Read/List** — List all tasks; filter by search, status, and category
- ✏️ **Update** — Edit and save an existing task
- 🗑️ **Delete** — Permanently remove a task

## 📸 Screenshots

<details>
  <summary>Click to view screenshots</summary>

  ### Home Pages
  ![Home Page 1](./public/screenshots/home.png)
  ![Home Page 2](./public/screenshots/home_2.png)
  ![Home Page 3](./public/screenshots/home_3.png)

  ### Login
  ![Login Page](./public/screenshots/login.png)
</details>
