import TaskItem from './TaskItem'
import { useLanguage } from '../context/LanguageContext'

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const { t } = useLanguage()

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="text-3xl">📋</span>
        </div>
        <p className="text-white/50 font-medium">{t('list_empty')}</p>
        <p className="text-white/25 text-sm mt-1">{t('list_empty_sub')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList
