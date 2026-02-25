/**
 * Task Interface (Görev Arayüzü)
 * Bir görevi temsil eden veri yapısı
 *
 * @typedef {Object} Task
 * @property {string}  id          - Benzersiz görev kimliği (UUID)
 * @property {string}  title       - Görev başlığı
 * @property {string}  description - Görev açıklaması (opsiyonel)
 * @property {string}  priority    - Öncelik seviyesi: 'low' | 'medium' | 'high'
 * @property {string}  category    - Kategori: 'personal' | 'work' | 'shopping' | 'other'
 * @property {boolean} completed   - Tamamlandı mı?
 * @property {string}  createdAt   - Oluşturulma tarihi (ISO string)
 * @property {string|null} dueDate - Bitiş tarihi (ISO string veya null)
 */

/**
 * Yeni bir Task nesnesi oluşturur
 * @param {Partial<Task>} params
 * @returns {Task}
 */
export function createTask({
  title = '',
  description = '',
  priority = 'medium',
  category = 'personal',
  dueDate = null,
} = {}) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    priority,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate,
  }
}

/**
 * Öncelik etiketi ve renk bilgisi döner
 * @param {'low'|'medium'|'high'} priority
 */
export const PRIORITY_CONFIG = {
  low:    { label: 'Düşük',  color: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  medium: { label: 'Orta',   color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  high:   { label: 'Yüksek', color: 'bg-red-100 text-red-700',      dot: 'bg-red-500'    },
}

/**
 * Kategori etiketi ve renk bilgisi döner
 */
export const CATEGORY_CONFIG = {
  personal: { label: 'Kişisel',   icon: '👤' },
  work:     { label: 'İş',        icon: '💼' },
  shopping: { label: 'Alışveriş', icon: '🛒' },
  other:    { label: 'Diğer',     icon: '📌' },
}
