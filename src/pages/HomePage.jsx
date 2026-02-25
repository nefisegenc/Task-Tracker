import { useState, useMemo } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskFilter from '../components/TaskFilter'
import Navbar from '../components/Navbar'
import { useLanguage } from '../context/LanguageContext'
import PolicyModal from '../components/PolicyModal'

const STORAGE_KEY = 'checklist_tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function HomePage({ user, onLogout }) {
  const [tasks, setTasks]             = useState(loadTasks)
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter]           = useState('all')
  const [category, setCategory]       = useState('all')
  const [searchText, setSearchText]   = useState('')
  const [showForm, setShowForm]       = useState(false)
  const { t } = useLanguage()

  function handleAdd(newTask) {
    const updated = [newTask, ...tasks]
    setTasks(updated); saveTasks(updated); setShowForm(false)
  }
  function handleUpdate(updatedTask) {
    const updated = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    setTasks(updated); saveTasks(updated); setEditingTask(null)
  }
  function handleToggle(id) {
    const updated = tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    setTasks(updated); saveTasks(updated)
  }
  function handleDelete(id) {
    if (!window.confirm(t('home_confirm_delete'))) return
    const updated = tasks.filter((t) => t.id !== id)
    setTasks(updated); saveTasks(updated)
    if (editingTask?.id === id) setEditingTask(null)
  }
  function handleEdit(task) { setEditingTask(task); setShowForm(true) }
  function handleCancelForm() { setEditingTask(null); setShowForm(false) }

  const filteredTasks = useMemo(() => tasks.filter((t) => {
    const mf = filter === 'all' || (filter === 'active' && !t.completed) || (filter === 'completed' && t.completed)
    const mc = category === 'all' || t.category === category
    const ms = t.title.toLowerCase().includes(searchText.toLowerCase()) ||
               t.description.toLowerCase().includes(searchText.toLowerCase())
    return mf && mc && ms
  }), [tasks, filter, category, searchText])

  const counts = {
    all:       tasks.length,
    active:    tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }
  const completionRate = tasks.length > 0 ? Math.round((counts.completed / tasks.length) * 100) : 0

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white/85 tracking-tight">
              {t('home_greeting', user.name.split(' ')[0])}
            </h1>
            <p className="text-sm text-white/30 mt-0.5">
              {counts.active > 0 ? t('home_tasks_waiting', counts.active) : t('home_all_done')}
            </p>
          </div>
          {!showForm && !editingTask && (
            <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              {t('home_new_task')}
            </button>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
                      { label: t('home_stat_total'),  value: counts.all,       sub: t('home_stat_tasks_unit') },
            { label: t('home_stat_active'),   value: counts.active,    sub: t('home_stat_waiting')    },
            { label: t('home_stat_done'),     value: counts.completed, sub: t('home_stat_completed')  },
          ].map(({ label, value, sub }) => (
            <div key={label} className="stat-card">
              <div className="text-2xl font-bold text-white/80">{value}</div>
              <div className="text-white/35 text-xs font-semibold mt-0.5">{label}</div>
              <div className="text-white/20 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        {tasks.length > 0 && (
          <div className="glass-card p-5">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{t('home_progress_label')}</span>
              <span className="text-xs font-bold text-white/60">{completionRate}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${completionRate}%` }} />
            </div>
            <p className="text-xs text-white/25 mt-2">
              {t('home_progress_detail', counts.completed, counts.active)}
            </p>
          </div>
        )}

        {/* Form */}
        {(showForm || editingTask) && (
          <TaskForm
            key={editingTask?.id ?? 'new'}
            onSubmit={editingTask ? handleUpdate : handleAdd}
            editingTask={editingTask}
            onCancel={handleCancelForm}
          />
        )}

        {/* Filtreler */}
        <TaskFilter
          filter={filter} category={category} searchText={searchText}
          onFilterChange={setFilter} onCategoryChange={setCategory}
          onSearchChange={setSearchText} counts={counts}
        />

        {/* Liste */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-semibold text-white/35 uppercase tracking-wider">
              {t('home_task_count', filteredTasks.length)}
            </h2>
            {counts.completed > 0 && (
              <button
                onClick={() => {
                  if (!window.confirm(t('home_confirm_clear'))) return
                  const updated = tasks.filter((t2) => !t2.completed)
                  setTasks(updated); saveTasks(updated)
                }}
                className="text-xs text-red-400/50 hover:text-red-400/80 transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t('home_clear_completed')}
              </button>
            )}
          </div>
          <TaskList tasks={filteredTasks} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <footer className="text-center pb-6 space-y-2">
          <p className="text-xs text-white/15">{t('home_footer')}</p>
          <div className="flex items-center justify-center gap-3">
            <PolicyModal initialTab="disclosure" trigger={
              <span className="text-xs text-white/20 hover:text-white/50 transition-colors">{t('policy_disclosure')}</span>
            } />
            <span className="text-white/10 text-xs">·</span>
            <PolicyModal initialTab="privacy" trigger={
              <span className="text-xs text-white/20 hover:text-white/50 transition-colors">{t('policy_privacy')}</span>
            } />
            <span className="text-white/10 text-xs">·</span>
            <PolicyModal initialTab="terms" trigger={
              <span className="text-xs text-white/20 hover:text-white/50 transition-colors">{t('policy_terms')}</span>
            } />
          </div>
        </footer>
      </main>
    </div>
  )
}

export default HomePage
