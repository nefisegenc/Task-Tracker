const DEFAULT_BASE = 'http://localhost:4000'
const API_BASE = import.meta.env.VITE_API_URL ?? DEFAULT_BASE

async function request(path, opts = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, opts)
    if (!res.ok) throw new Error('Network error')
    return await res.json()
  } catch (err) {
    // fallback to localStorage for offline / test environments
    throw err
  }
}

export async function getTasks() {
  try {
    return await request('/tasks')
  } catch (e) {
    const raw = localStorage.getItem('checklist_tasks')
    return raw ? JSON.parse(raw) : []
  }
}

export async function createTask(task) {
  try {
    return await request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
  } catch (e) {
    const tasks = JSON.parse(localStorage.getItem('checklist_tasks') || '[]')
    tasks.unshift(task)
    localStorage.setItem('checklist_tasks', JSON.stringify(tasks))
    return task
  }
}

export async function updateTask(id, patch) {
  try {
    return await request(`/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
  } catch (e) {
    const tasks = JSON.parse(localStorage.getItem('checklist_tasks') || '[]')
    const updated = tasks.map(t => t.id === id ? { ...t, ...patch } : t)
    localStorage.setItem('checklist_tasks', JSON.stringify(updated))
    return updated.find(t => t.id === id)
  }
}

export async function deleteTask(id) {
  try {
    return await request(`/tasks/${id}`, { method: 'DELETE' })
  } catch (e) {
    const tasks = JSON.parse(localStorage.getItem('checklist_tasks') || '[]')
    const updated = tasks.filter(t => t.id !== id)
    localStorage.setItem('checklist_tasks', JSON.stringify(updated))
    return {}
  }
}
