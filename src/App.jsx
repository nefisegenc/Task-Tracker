import { useState } from 'react'
import { getSession, logout } from './interfaces/User'
import { LanguageProvider } from './context/LanguageContext'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

function App() {
  const [user, setUser] = useState(() => getSession())

  function handleAuth(loggedInUser) {
    setUser(loggedInUser)
  }

  function handleLogout() {
    logout()
    setUser(null)
  }

  return (
    <LanguageProvider>
      {!user
        ? <AuthPage onAuth={handleAuth} />
        : <HomePage user={user} onLogout={handleLogout} />
      }
    </LanguageProvider>
  )
}

export default App
