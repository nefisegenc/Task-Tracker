import { CATEGORY_CONFIG } from '../interfaces/Task'
import { useLanguage } from '../context/LanguageContext'

function TaskFilter({ filter, category, searchText, onFilterChange, onCategoryChange, onSearchChange, counts }) {
  const { t } = useLanguage()

  const FILTERS = [
    { key: 'all',       label: t('filter_all')       },
    { key: 'active',    label: t('filter_active')    },
    { key: 'completed', label: t('filter_completed') },
  ]
  return (
    <div className="glass-card p-5 space-y-4">
      {/* Arama */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="input-field pl-10"
          placeholder={t('filter_search_placeholder')}
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchText && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Durum Filtreleri */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`filter-chip ${filter === key ? 'active' : ''}`}
          >
            {label}
            <span className={`ml-1.5 text-xs ${
              filter === key ? 'text-white/60' : 'text-white/25'
            }`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Kategori Filtreleri */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onCategoryChange('all')}
          className={`filter-chip text-xs ${category === 'all' ? 'active' : ''}`}
        >
          {t('filter_all_cats')}
        </button>
        {Object.entries(CATEGORY_CONFIG).map(([key]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`filter-chip text-xs ${category === key ? 'active' : ''}`}
          >
            {CATEGORY_CONFIG[key].icon} {t(`category_${key}`)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TaskFilter
