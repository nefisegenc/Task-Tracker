import { createContext, useContext, useState } from 'react'

const translations = {
  tr: {
    app_name: 'Görev Takibi',

    // Auth
    auth_login_tab:          'Giriş Yap',
    auth_register_tab:       'Kayıt Ol',
    auth_login_subtitle:     'Hesabına giriş yap',
    auth_register_subtitle:  'Ücretsiz hesap oluştur',
    auth_name_label:         'Ad Soyad',
    auth_name_placeholder:   'Adın Soyadın',
    auth_email_label:        'E-posta',
    auth_email_placeholder:  'ornek@mail.com',
    auth_password_label:     'Şifre',
    auth_password_placeholder: 'En az 6 karakter',
    auth_submit_login:       'Giriş Yap',
    auth_submit_register:    'Hesap Oluştur',
    auth_processing:         'İşleniyor...',
    auth_no_account:         'Hesabın yok mu?',
    auth_has_account:        'Zaten hesabın var mı?',
    auth_demo_title:         'DK',
    auth_demo_desc:          'Bilgiler otomatik dolduruldu. Direkt giriş yapabilirsin.',

    // Navbar
    nav_logout: 'Çıkış Yap',

    // HomePage
    home_greeting:        (name) => `Merhaba, ${name} 👋`,
    home_tasks_waiting:   (n) => `${n} görev bekliyor`,
    home_all_done:        'Tüm görevler tamamlandı ✔',
    home_new_task:        'Yeni Görev',
    home_stat_total:      'Toplam',
    home_stat_active:     'Aktif',
    home_stat_done:       'Bitti',
    home_stat_tasks_unit: 'görev',
    home_stat_waiting:    'bekliyor',
    home_stat_completed:  'tamamlandı',
    home_progress_label:  'İlerleme',
    home_progress_detail: (c, a) => `${c} tamamlandı · ${a} bekliyor`,
    home_task_count:      (n) => `${n} görev`,
    home_clear_completed: 'Tamamlananları temizle',
    home_confirm_delete:  'Bu görevi silmek istediğinden emin misin?',
    home_confirm_clear:   'Tamamlanan görevler silinsin mi?',
    home_footer:          'Görev Takibi · React + Tailwind CSS · Nefise Genç',

    // TaskForm
    form_new_title:        'Yeni Görev',
    form_edit_title:       'Görevi Düzenle',
    form_title_label:      'Başlık',
    form_title_placeholder:'Görev başlığını girin...',
    form_title_error:      'Görev başlığı boş bırakılamaz.',
    form_desc_label:       'Açıklama',
    form_desc_placeholder: 'Opsiyonel açıklama...',
    form_priority_label:   'Öncelik',
    form_category_label:   'Kategori',
    form_due_label:        'Bitiş Tarihi',
    form_submit_add:       'Ekle',
    form_submit_update:    'Güncelle',
    form_cancel:           'İptal',

    // TaskFilter
    filter_search_placeholder: 'Görev ara...',
    filter_all:       'Tümü',
    filter_active:    'Aktif',
    filter_completed: 'Tamamlanan',
    filter_all_cats:  '🗂 Tümü',

    // TaskList
    list_empty:     'Görev bulunamadı',
    list_empty_sub: 'Filtreni değiştir veya yeni görev ekle.',

    // TaskItem
    item_due:        'Bitiş:',
    item_aria_complete: 'Tamamlandı olarak işaretle',
    item_aria_undo:     'Görevi geri al',
    item_aria_edit:     'Görevi düzenle',
    item_aria_delete:   'Görevi sil',

    // Priority labels
    priority_low:    'Düşük',
    priority_medium: 'Orta',
    priority_high:   'Yüksek',

    // Category labels
    category_personal: 'Kişisel',
    category_work:     'İş',
    category_shopping: 'Alışveriş',
    category_other:    'Diğer',

    policy_disclosure: 'Aydınlatma Metni',
    policy_privacy:    'Gizlilik Politikası',
    policy_terms:      'Kullanım Koşulları',

    // User errors
    err_required:     'Tüm alanlar zorunludur.',
    err_invalid_email:'Geçerli bir e-posta girin.',
    err_short_pass:   'Şifre en az 6 karakter olmalıdır.',
    err_email_taken:  'Bu e-posta zaten kayıtlı.',
    err_missing_creds:'E-posta ve şifre gereklidir.',
    err_wrong_creds:  'E-posta veya şifre hatalı.',
  },

  en: {
    app_name: 'Task Tracker',

    // Auth
    auth_login_tab:          'Login',
    auth_register_tab:       'Register',
    auth_login_subtitle:     'Sign in to your account',
    auth_register_subtitle:  'Create a free account',
    auth_name_label:         'Full Name',
    auth_name_placeholder:   'Your Full Name',
    auth_email_label:        'Email',
    auth_email_placeholder:  'example@mail.com',
    auth_password_label:     'Password',
    auth_password_placeholder: 'At least 6 characters',
    auth_submit_login:       'Login',
    auth_submit_register:    'Create Account',
    auth_processing:         'Processing...',
    auth_no_account:         "Don't have an account?",
    auth_has_account:        'Already have an account?',
    auth_demo_title:         'Demo',
    auth_demo_desc:          'Credentials are pre-filled. You can sign in directly.',

    // Navbar
    nav_logout: 'Logout',

    // HomePage
    home_greeting:        (name) => `Hello, ${name} 👋`,
    home_tasks_waiting:   (n) => `${n} task${n !== 1 ? 's' : ''} pending`,
    home_all_done:        'All tasks completed ✔',
    home_new_task:        'New Task',
    home_stat_total:      'Total',
    home_stat_active:     'Active',
    home_stat_done:       'Done',
    home_stat_tasks_unit: 'tasks',
    home_stat_waiting:    'pending',
    home_stat_completed:  'completed',
    home_progress_label:  'Progress',
    home_progress_detail: (c, a) => `${c} completed · ${a} pending`,
    home_task_count:      (n) => `${n} task${n !== 1 ? 's' : ''}`,
    home_clear_completed: 'Clear completed',
    home_confirm_delete:  'Are you sure you want to delete this task?',
    home_confirm_clear:   'Delete all completed tasks?',
    home_footer:          'Task Tracker · React + Tailwind CSS · Nefise Genç',

    // TaskForm
    form_new_title:        'New Task',
    form_edit_title:       'Edit Task',
    form_title_label:      'Title',
    form_title_placeholder:'Enter task title...',
    form_title_error:      'Task title cannot be empty.',
    form_desc_label:       'Description',
    form_desc_placeholder: 'Optional description...',
    form_priority_label:   'Priority',
    form_category_label:   'Category',
    form_due_label:        'Due Date',
    form_submit_add:       'Add',
    form_submit_update:    'Update',
    form_cancel:           'Cancel',

    // TaskFilter
    filter_search_placeholder: 'Search tasks...',
    filter_all:       'All',
    filter_active:    'Active',
    filter_completed: 'Completed',
    filter_all_cats:  '🗂 All',

    // TaskList
    list_empty:     'No tasks found',
    list_empty_sub: 'Try changing your filter or add a new task.',

    // TaskItem
    item_due:        'Due:',
    item_aria_complete: 'Mark as completed',
    item_aria_undo:     'Mark as incomplete',
    item_aria_edit:     'Edit task',
    item_aria_delete:   'Delete task',

    // Priority labels
    priority_low:    'Low',
    priority_medium: 'Medium',
    priority_high:   'High',

    // Category labels
    category_personal: 'Personal',
    category_work:     'Work',
    category_shopping: 'Shopping',
    category_other:    'Other',

    policy_disclosure: 'Disclosure Notice',
    policy_privacy:    'Privacy Policy',
    policy_terms:      'Terms of Use',

    // User errors
    err_required:     'All fields are required.',
    err_invalid_email:'Please enter a valid email.',
    err_short_pass:   'Password must be at least 6 characters.',
    err_email_taken:  'This email is already registered.',
    err_missing_creds:'Email and password are required.',
    err_wrong_creds:  'Incorrect email or password.',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_lang') || 'tr'
  })

  function toggleLang(newLang) {
    setLang(newLang)
    localStorage.setItem('app_lang', newLang)
  }

  /** Çeviri fonksiyonu — string ya da fonksiyon olabilir */
  function t(key, ...args) {
    const val = translations[lang]?.[key] ?? translations['tr'][key] ?? key
    return typeof val === 'function' ? val(...args) : val
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
