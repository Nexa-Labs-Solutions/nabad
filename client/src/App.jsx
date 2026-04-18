import { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from '@clerk/clerk-react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const { getToken } = useAuth()
  const [backendMsg, setBackendMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchHello = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      const res = await fetch(`${API_URL}/hello`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setBackendMsg(data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>Hello World</h1>

      <SignedOut>
        <p>Sign in to connect with the backend.</p>
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <div className="user-bar">
          <UserButton />
        </div>
        <p>You are signed in.</p>
        <button onClick={fetchHello} disabled={loading}>
          {loading ? 'Loading…' : 'Ping Backend'}
        </button>
        {error && <p className="error">Error: {error}</p>}
        {backendMsg && <p>Backend says: <strong>{backendMsg}</strong></p>}
      </SignedIn>
    </div>
  )
}

export default App
