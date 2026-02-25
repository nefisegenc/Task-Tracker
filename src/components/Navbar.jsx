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
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: 'linear-gradient(135deg,#3a3a4a,#2a2a38)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white/70 tracking-tight">{t('app_name')}</span>
        </div>

        {/* Sağ taraf */}
        <div className="flex items-center gap-3">
          {/* Dil Değiştirici */}
          <div className="flex items-center gap-0.5">
            {['tr', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => toggleLang(l)}
                className={`relative px-2 py-1 text-xs font-semibold tracking-wider transition-all duration-200 ${
                  lang === l ? 'text-white/90' : 'text-white/30 hover:text-white/55'
                }`}
              >
                {l.toUpperCase()}
                {lang === l && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px rounded-full"
                    style={{ background: 'rgba(255,255,255,0.55)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Kullanıcı */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/5"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white/80"
                   style={{ background: 'linear-gradient(135deg,#4a4a5a,#2a2a38)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {initials}
              </div>
              <svg className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 dropdown-menu"
                   onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-semibold text-white/80">{user.name}</p>
                  <p className="text-xs text-white/35 mt-0.5 truncate">{user.email}</p>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
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
