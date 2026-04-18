import { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
  useUser,
} from '@clerk/clerk-react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const { getToken } = useAuth()
  const { user } = useUser()
  const [backendMsg, setBackendMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveMsg, setSaveMsg] = useState(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState(null)

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

  const saveUser = async () => {
    setSaveLoading(true)
    setSaveError(null)
    setSaveMsg(null)
    try {
      const token = await getToken()
      const email = user?.primaryEmailAddress?.emailAddress || null
      const res = await fetch(`${API_URL}/save-user`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setSaveMsg(`User found & saved! Clerk ID: ${data.user.clerk_id}`)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaveLoading(false)
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
        <button onClick={saveUser} disabled={saveLoading} style={{ marginTop: '1rem' }}>
          {saveLoading ? 'Saving…' : 'Save User to DB'}
        </button>
        {saveError && <p className="error">Error: {saveError}</p>}
        {saveMsg && <p><strong>{saveMsg}</strong></p>}
      </SignedIn>
    </div>
  )
}

export default App
