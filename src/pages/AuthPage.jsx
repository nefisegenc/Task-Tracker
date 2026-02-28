import { useState, useEffect } from 'react'
import { login, register, getUsers } from '../interfaces/User'
import { useLanguage } from '../context/LanguageContext'
import PolicyModal from '../components/PolicyModal'

// Demo hesap bilgileri — hocalar için otomatik doldurulur
const DEMO_EMAIL    = 'demo@gorevtakibi.com'
const DEMO_PASSWORD = 'demo123'
const DEMO_NAME     = 'Demo Kullanıcı'

function ensureDemoUser() {
  const users = getUsers()
  if (!users.find((u) => u.email === DEMO_EMAIL)) {
    register({ name: DEMO_NAME, email: DEMO_EMAIL, password: DEMO_PASSWORD })
  }
}

function AuthPage({ onAuth }) {
  const [mode, setMode]         = useState('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  const isLogin = mode === 'login'

  // Sayfa ilk açıldığında demo kullanıcıyı oluştur
  useEffect(() => { ensureDemoUser() }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = isLogin
        ? login({ email, password })
        : register({ name, email, password })

      setLoading(false)
      if (!result.ok) { setError(t(result.error)); return }
      onAuth(result.user)
    }, 400)
  }

  function switchMode() {
    const next = isLogin ? 'register' : 'login'
    setMode(next)
    setError('')
    setName('')
    // Kayıt moduna geçince alanları temizle, girişe dönünce demo doldur
    setEmail(next === 'login' ? DEMO_EMAIL : '')
    setPassword(next === 'login' ? DEMO_PASSWORD : '')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Dil Seçici — sağ üst köşe */}
      <div className="fixed top-4 right-4 z-50">
        <div
          className="flex items-center rounded-full p-0.5"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          {['tr', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => toggleLang(l)}
              className={`relative px-3 py-1 text-xs font-semibold tracking-wider rounded-full transition-all duration-200 ${
                lang === l ? 'text-white' : 'text-white/35 hover:text-white/60'
              }`}
              style={
                lang === l
                  ? {
                      background: 'linear-gradient(135deg, rgba(20,184,166,0.75), rgba(13,148,136,0.75))',
                      boxShadow: '0 0 8px rgba(20,184,166,0.3)',
                    }
                  : {}
              }
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Arka plan parıltıları */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(120,120,140,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(80,80,100,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo & Başlık */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg"
               style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.85), rgba(13,148,136,0.85))', border: '1px solid rgba(94,234,212,0.3)', boxShadow: '0 0 20px rgba(20,184,166,0.3)' }}>
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white/90 tracking-tight">{t('app_name')}</h1>
          <p className="text-sm text-white/35 mt-1">
            {isLogin ? t('auth_login_subtitle') : t('auth_register_subtitle')}
          </p>
        </div>

        {/* Kart */}
        <div className="auth-card p-8 space-y-5">
          {/* Tab */}
          <div className="flex rounded-xl overflow-hidden p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {['login', 'register'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m)
                  setError('')
                  setEmail(m === 'login' ? DEMO_EMAIL : '')
                  setPassword(m === 'login' ? DEMO_PASSWORD : '')
                  setName('')
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  mode === m
                    ? 'text-white shadow-sm'
                    : 'text-white/35 hover:text-white/55'
                }`}
                style={mode === m ? { background: 'rgba(20,184,166,0.18)', border: '1px solid rgba(94,234,212,0.25)' } : {}}
              >
                {m === 'login' ? t('auth_login_tab') : t('auth_register_tab')}
              </button>
            ))}
          </div>

          {/* Demo Bilgi Banner — sadece giriş modunda */}
          {isLogin && (
            <div className="flex items-start gap-2.5 rounded-xl px-3.5 py-3"
                 style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <svg className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p className="text-xs font-semibold text-white/55">{t('auth_demo_title')}</p>
                <p className="text-xs text-white/30 mt-0.5">{t('auth_demo_desc')}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Ad Soyad (sadece kayıt) */}
            {!isLogin && (
              <div>
                <label className="auth-label">{t('auth_name_label')}</label>
                <div className="relative">
                  <span className="input-icon">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input type="text" className="input-field pl-10" placeholder={t('auth_name_placeholder')}
                         value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
            )}

            {/* E-posta */}
            <div>
              <label className="auth-label">{t('auth_email_label')}</label>
              <div className="relative">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <input
                  type="email"
                  className={`input-field pl-10 ${isLogin ? 'opacity-60 cursor-not-allowed select-none' : ''}`}
                  placeholder={t('auth_email_placeholder')}
                  value={email}
                  onChange={(e) => !isLogin && setEmail(e.target.value)}
                  readOnly={isLogin}
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label className="auth-label">{t('auth_password_label')}</label>
              <div className="relative">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className={`input-field pl-10 pr-10 ${isLogin ? 'opacity-60 cursor-not-allowed select-none' : ''}`}
                  placeholder={isLogin ? '' : t('auth_password_placeholder')}
                  value={password}
                  onChange={(e) => !isLogin && setPassword(e.target.value)}
                  readOnly={isLogin}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors">
                  {showPass
                    ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Hata */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 mt-1"
              style={{
                background: loading ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, rgba(20,184,166,0.9), rgba(13,148,136,0.9))',
                border: loading ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(94,234,212,0.3)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(20,184,166,0.35)',
              }}
            >
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {t('auth_processing')}
                  </span>
                : isLogin ? t('auth_submit_login') : t('auth_submit_register')
              }
            </button>
          </form>

          {/* Alt Link */}
          <p className="text-center text-xs text-white/30 pt-1">
            {isLogin ? t('auth_no_account') : t('auth_has_account')}{' '}
            <button onClick={switchMode} className="text-white/60 hover:text-white/90 font-semibold transition-colors">
              {isLogin ? t('auth_register_tab') : t('auth_login_tab')}
            </button>
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-center text-xs text-white/15">
            {t('app_name')} · React + Tailwind CSS · Nefise Genç
          </p>
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
        </div>
      </div>
    </div>
  )
}

export default AuthPage
