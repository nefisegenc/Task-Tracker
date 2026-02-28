# Task Tracker

A responsive task management application built with **React**, **Tailwind CSS**, and **Vite**. Supports bilingual (TR/EN) interface, task categories, priority levels, due dates, and local persistence via JSON Server.

---

## Features

- Add, edit, delete tasks
- Mark tasks as completed
- Filter by status (All / Active / Completed) and category (Personal, Work, Shopping, Other)
- Search tasks by keyword
- Priority levels: Low, Medium, High
- Due date support
- Progress bar
- Bilingual UI (Turkish / English)
- Authentication page (Login / Register)
- Privacy Policy modal
- Dark theme

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, Tailwind CSS 3 |
| Build | Vite 6 |
| API | JSON Server 0.17 |
| Testing | Vitest, Testing Library |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the JSON Server (port 4000)
npm run serve:api

# Start the dev server (port 5173)
npm run dev
```

---

## Running Tests

```bash
npm test
```

---

## Screenshots

### Login
![Login](public/screenshots/login.png)

### Home – Empty State
![Home Empty](public/screenshots/home_empty.png)

### Home
![Home](public/screenshots/home.png)

### Home – Task List
![Home Tasks](public/screenshots/home_tasks.png)

### Home – Turkish
![Home TR](public/screenshots/home_tr.png)

### Privacy Policy Modal
![Policy Modal](public/screenshots/policy_modal.png)

---

## Project Structure

```
src/
├── components/     # Nav