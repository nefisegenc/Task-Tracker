import { useState, useMemo, useEffect } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskFilter from '../components/TaskFilter'
import Navbar from '../components/Navbar'
import { useLanguage } from '../context/LanguageContext'
import PolicyModal from '../components/PolicyModal'
import * as api from '../api'

const STORAGE_KEY = 'checklist_tasks'

function HomePage({ user, onLogout }) {
  const [tasks, setTasks]             = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter]           = useState('all')
  const [category, setCategory]       = useState('all')
  const [searchText, setSearchText]   = useState('')
  const [showForm, setShowForm]       = useState(false)
  const { t } = useLanguage()

  // API-backed handlers (fall back to localStorage in api.js)
  async function loadAll() {
    const data = await api.getTasks()
    setTasks(Array.isArray(data) ? data.reverse() : [])
  }

  async function handleAdd(newTask) {
    // ensure id for json-server/localStorage
    const payload = { ...newTask, createdAt: newTask.createdAt ?? new Date().toISOString(), id: newTask.id ?? Date.now() }
    await api.createTask(payload)
    await loadAll()
    setShowForm(false)
  }

  async function handleUpdate(updatedTask) {
    await api.updateTask(updatedTask.id, updatedTask)
    await loadAll()
    setEditingTask(null)
  }

  async function handleToggle(id) {
    const t = tasks.find(x => x.id === id)
    if (!t) return
    await api.updateTask(id, { completed: !t.completed })
    await loadAll()
  }

  async function handleDelete(id) {
    if (!window.confirm(t('home_confirm_delete'))) return
    await api.deleteTask(id)
    await loadAll()
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

  useEffect(() => { loadAll() }, [])

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Header */}
        <div
          className="relative rounded-2xl px-5 py-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(255,255,255,0.025) 60%, rgba(13,148,136,0.06) 100%)',
            border: '1px solid rgba(94,234,212,0.13)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          {/* Dekoratif arka plan dairesi */}
          <div
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 70%)',
            }}
          />

          <div className="relative flex items-center justify-between gap-4">
            <div className="min-w-0">
              {/* Üst badge */}
              <div className="flex items-center gap-1.5 mb-2">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(20,184,166,0.15)',
                    border: '1px solid rgba(94,234,212,0.25)',
                    color: 'rgba(94,234,212,0.9)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'rgba(94,234,212,0.9)', boxShadow: '0 0 5px rgba(20,184,166,0.7)' }}
                  />
                  Task Tracker
                </span>
              </div>

              {/* Başlık */}
              <h1
                className="text-2xl font-extrabold tracking-tight leading-tight"
                style={{
                  background: 'linear-gradient(90deg, #fff 0%, rgba(94,234,212,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('home_greeting', user.name.split(' ')[0])}
              </h1>

              {/* Alt yazı */}
              <p className="text-sm mt-1.5 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {counts.active > 0 ? (
                  <>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(94,234,212,0.6)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                    </svg>
                    {t('home_tasks_waiting', counts.active)}
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(94,234,212,0.6)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('home_all_done')}
                  </>
                )}
              </p>
            </div>

            {!showForm && !editingTask && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex-shrink-0 flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                {t('home_new_task')}
              </button>
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
                      { label: t('home_stat_total'),  value: counts.all,       sub: t('home_stat_tasks_unit') },
            { label: t('home_stat_active'),   value: counts.active,    sub: t('home_stat_waiting')    },
            { label: t('home_stat_done'),     value: counts.completed, sub: t('home_stat_completed')  },
          ].map(({ label, value, sub }) => (
            <div key={label} className="stat-card">
              <div className="text-2xl font-bold stat-number">{value}</div>
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
        <div className="glass-card overflow-hidden">
          {/* Tablo başlığı — monday.com stili */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 border-b"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {/* Boş alan: sol bar + checkbox */}
            <div className="w-8 flex-shrink-0" />
            {/* Görev başlığı */}
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                {t('home_task_count', filteredTasks.length)}
              </span>
            </div>
            {/* Durum */}
            <span className="hidden sm:block text-xs font-semibold text-white/25 uppercase tracking-widest min-w-[80px] text-center">{t('col_status')}</span>
            {/* Öncelik */}
            <span className="hidden md:block text-xs font-semibold text-white/25 uppercase tracking-widest min-w-[72px] text-center">{t('col_priority')}</span>
            {/* Tarih */}
            <span className="hidden sm:block text-xs font-semibold text-white/25 uppercase tracking-widest min-w-[64px] text-right">{t('col_due')}</span>
            {/* Aksiyon boşluğu */}
            <div className="w-[62px] flex-shrink-0 flex justify-end">
              {counts.completed > 0 && (
                <button
                  onClick={() => {
                    if (!window.confirm(t('home_confirm_clear'))) return
                    const updated = tasks.filter((t2) => !t2.completed)
                    setTasks(updated); saveTasks(updated)
                  }}
                  className="text-xs text-red-400/40 hover:text-red-400/70 transition-colors"
                  title={t('home_clear_completed')}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Görev satırları */}
          <div className="p-3">
            <TaskList tasks={filteredTasks} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
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
