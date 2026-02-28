import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="sticky top-0 z-50 navbar-blur">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.85) 0%, rgba(13,148,136,0.85) 100%)',
              border: '1px solid rgba(94,234,212,0.3)',
              boxShadow: '0 0 14px rgba(20,184,166,0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
            }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="leading-tight">
            <span
              className="text-sm font-bold tracking-tight"
              style={{
                background: 'linear-gradient(90deg, #fff 0%, rgba(94,234,212,0.9) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('app_name')}
            </span>
          </div>
        </div>

        {/* Sağ taraf */}
        <div className="flex items-center gap-3">

          {/* Dil Pill Toggle */}
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
                className={`relative px-3 py-1 text-xs font-semibold tracking-wider rounded-full transition-all duration-250 ${
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

          {/* Kullanıcı */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/5"
              style={{ border: '1px solid transparent' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(94,234,212,0.15)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, rgba(20,184,166,0.7), rgba(13,148,136,0.7))',
                  border: '1.5px solid rgba(94,234,212,0.35)',
                  boxShadow: '0 0 8px rgba(20,184,166,0.25)',
                }}
              >
                {initials}
              </div>
              <span className="text-sm text-white/65 font-medium max-w-[90px] truncate hidden sm:block">
                {user.name.split(' ')[0]}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 dropdown-menu"
                onClick={() => setMenuOpen(false)}
              >
                {/* Kullanıcı bilgisi */}
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-white/5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20,184,166,0.75), rgba(13,148,136,0.75))',
                      border: '1.5px solid rgba(94,234,212,0.3)',
                    }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/85 truncate">{user.name}</p>
                    <p className="text-xs text-white/35 mt-0.5 truncate">{user.email}</p>
                  </div>
                </div>
                {/* Çıkış */}
                <div className="p-1.5">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    {t('nav_logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
