import { useState } from 'react'
import { createTask, PRIORITY_CONFIG, CATEGORY_CONFIG } from '../interfaces/Task'
import { useLanguage } from '../context/LanguageContext'

function TaskForm({ onSubmit, editingTask = null, onCancel }) {
  const { t } = useLanguage()
  const [title, setTitle]             = useState(editingTask?.title ?? '')
  const [description, setDescription] = useState(editingTask?.description ?? '')
  const [priority, setPriority]       = useState(editingTask?.priority ?? 'medium')
  const [category, setCategory]       = useState(editingTask?.category ?? 'personal')
  const [dueDate, setDueDate]         = useState(editingTask?.dueDate?.slice(0, 10) ?? '')
  const [error, setError]             = useState('')

  const isEditing = Boolean(editingTask)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError(t('form_title_error')); return }
    setError('')
    const task = isEditing
      ? { ...editingTask, title: title.trim(), description, priority, category, dueDate: dueDate || null }
      : createTask({ title: title.trim(), description, priority, category, dueDate: dueDate || null })
    onSubmit(task)
    if (!isEditing) { setTitle(''); setDescription(''); setPriority('medium'); setCategory('personal'); setDueDate('') }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
      {/* Form Başlık */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
             style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.85), rgba(13,148,136,0.85))', border: '1px solid rgba(94,234,212,0.25)', boxShadow: '0 0 10px rgba(20,184,166,0.3)' }}>
          {isEditing
            ? <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            : <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          }
        </div>
        <h2 className="text-base font-bold text-white">
          {isEditing ? t('form_edit_title') : t('form_new_title')}
        </h2>
        {onCancel && (
          <button type="button" onClick={onCancel} className="ml-auto text-white/30 hover:text-white/60 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Başlık */}
      <div>
        <label className="label-text">{t('form_title_label')} <span className="text-red-400 normal-case">*</span></label>
        <input
          type="text"
          className="input-field"
          placeholder={t('form_title_placeholder')}
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError('') }}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {error}
          </p>
        )}
      </div>

      {/* Açıklama */}
      <div>
        <label className="label-text">{t('form_desc_label')}</label>
        <textarea
          className="input-field resize-none"
          placeholder={t('form_desc_placeholder')}
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Öncelik & Kategori */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-text">{t('form_priority_label')}</label>
          <select className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
            {Object.entries(PRIORITY_CONFIG).map(([key]) => (
              <option key={key} value={key}>{t(`priority_${key}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text">{t('form_category_label')}</label>
          <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
              <option key={key} value={key}>{val.icon} {t(`category_${key}`)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bitiş Tarihi */}
      <div>
        <label className="label-text">{t('form_due_label')}</label>
        <input type="date" className="input-field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      {/* Butonlar */}
      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-primary flex-1">
          {isEditing ? t('form_submit_update') : t('form_submit_add')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {t('form_cancel')}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
