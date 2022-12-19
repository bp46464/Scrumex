import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser, loginUser, logoutUser, registerUser } from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [hasLogged, setHasLogged] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  // Reset the error if we change the page
  useEffect(() => {
    if (error) setError(null)
  }, [location.pathname])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getUser()

        if (data) {
          setUser(data)
          navigate('/dashboard')
          setHasLogged(true)
        }
      } catch (error) {}

      setLoadingInitial(false)
    })()
  }, [])

  const register = async (firstName, lastName, email, password) => {
    setLoading(true)

    try {
      const { data } = await registerUser({
        firstName,
        lastName,
        email,
        password,
      })

      if (data) navigate('/login')
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  const login = async (email, password) => {
    setLoading(true)

    try {
      const { data } = await loginUser({ email, password })

      if (data) {
        setUser(data)
        setHasLogged(true)
        navigate('/dashboard')
      }
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    await logoutUser()
    setUser(undefined)
    setHasLogged(false)
    navigate('/')
    setLoading(false)
    toast('Successfully logged out!')
  }

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      error,
      loading,
      hasLogged,
      register,
      login,
      logout,
    }),
    [user, loading, hasLogged, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
