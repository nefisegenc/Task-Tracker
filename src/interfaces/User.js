/**
 * User Interface — Kullanıcı veri modeli
 *
 * @typedef {Object} User
 * @property {string} id        - Benzersiz kullanıcı kimliği
 * @property {string} name      - Ad Soyad
 * @property {string} email     - E-posta (benzersiz, giriş için kullanılır)
 * @property {string} password  - Şifre (hash yok — saf frontend demo)
 * @property {string} createdAt - Kayıt tarihi
 */

const USERS_KEY = 'app_users'
const SESSION_KEY = 'app_session'

/** Kayıtlı tüm kullanıcıları döner */
export function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}

/** Kullanıcıları kaydeder */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/** Aktif oturumu döner (User | null) */
export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}

/** Oturumu kaydeder */
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

/** Oturumu sonlandırır */
export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

/**
 * Kayıt ol
 * @returns {{ ok: boolean, user?: User, error?: string }}
 */
export function register({ name, email, password }) {
  if (!name.trim() || !email.trim() || !password.trim())
    return { ok: false, error: 'err_required' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: 'err_invalid_email' }
  if (password.length < 6)
    return { ok: false, error: 'err_short_pass' }

  const users = getUsers()
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
    return { ok: false, error: 'err_email_taken' }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    createdAt: new Date().toISOString(),
  }
  saveUsers([...users, user])
  const { password: _, ...safeUser } = user
  saveSession(safeUser)
  return { ok: true, user: safeUser }
}

/**
 * Giriş yap
 * @returns {{ ok: boolean, user?: User, error?: string }}
 */
export function login({ email, password }) {
  if (!email.trim() || !password.trim())
    return { ok: false, error: 'err_missing_creds' }

  const users = getUsers()
  const found = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  )
  if (!found) return { ok: false, error: 'err_wrong_creds' }

  const { password: _, ...safeUser } = found
  saveSession(safeUser)
  return { ok: true, user: safeUser }
}
