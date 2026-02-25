import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '../interfaces/Task'
import { useLanguage } from '../context/LanguageContext'

const PRIORITY_GLOW = {
  low:    'rgba(52,211,153,0.15)',
  medium: 'rgba(251,191,36,0.15)',
  high:   'rgba(248,113,113,0.2)',
}

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { t } = useLanguage()
  const priority = PRIORITY_CONFIG[task.priority]
  const category = CATEGORY_CONFIG[task.category]
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date()

  function formatDate(iso) {
    if (!iso) return null
    return new Date(iso).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div
      className={`glass-card-hover flex items-start gap-4 p-4 ${
        task.completed ? 'opacity-50' : ''
      }`}
      style={!task.completed ? { boxShadow: `0 4px 16px ${PRIORITY_GLOW[task.priority] ?? 'rgba(0,0,0,0.2)'}` } : undefined}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          task.completed
            ? 'border-transparent'
            : 'border-white/20 hover:border-violet-400'
        }`}
        style={task.completed ? { background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 0 12px rgba(124,58,237,0.4)' } : {}}
        aria-label={task.completed ? t('item_aria_undo') : t('item_aria_complete')}
      >
        {task.completed && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* İçerik */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`text-sm font-semibold ${
            task.completed ? 'line-through text-white/25' : 'text-white/90'
          }`}>
            {task.title}
          </span>

          {/* Öncelik badge */}
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
            task.priority === 'high'   ? 'bg-red-500/15 text-red-400 border-red-500/20' :
            task.priority === 'medium' ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20' :
                                         'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-yellow-400' : 'bg-emerald-400'
            }`} />
            {t(`priority_${task.priority}`)}
          </span>

          {/* Kategori badge */}
          <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
            {category.icon} {t(`category_${task.category}`)}
          </span>
        </div>

        {/* Açıklama */}
        {task.description && (
          <p className="text-xs text-white/40 mb-1.5 truncate">{task.description}</p>
        )}

        {/* Tarihler */}
        <div className="flex flex-wrap gap-3 text-xs text-white/25">
          <span>{formatDate(task.createdAt)}</span>
          {task.dueDate && (
            <span className={isOverdue ? 'text-red-400 font-semibold' : 'text-white/30'}>
              {isOverdue ? '⚠ ' : ''}{t('item_due')} {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Aksiyon butonları */}
      <div className="flex gap-1.5 flex-shrink-0">
        <button onClick={() => onEdit(task)} className="btn-edit" aria-label={t('item_aria_edit')}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={() => onDelete(task.id)} className="btn-danger" aria-label={t('item_aria_delete')}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TaskItem
