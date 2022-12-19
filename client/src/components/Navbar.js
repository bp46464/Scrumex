import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../context'

import { MenuIcon, XIcon } from '@heroicons/react/solid'

const Navbar = () => {
  const { user, hasLogged, loading, logout } = useAuth()

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const location = useLocation()

  // Prevent from scrolling when mobile menu is shown
  useEffect(() => {
    showMobileMenu
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [showMobileMenu])

  const toggleMenu = () => setShowMobileMenu((prev) => !prev)

  const handleCloseMobileMenu = () => setShowMobileMenu(false)

  const handleLogout = async () => {
    await logout()
    handleCloseMobileMenu()
  }

  return (
    <>
      <div className="sticky top-0 bg-slate-900 shadow-lg">
        <nav
          className="container mx-auto flex items-center justify-between 
      px-6 py-4"
        >
          <h1 className="text-gray-200 text-2xl font-bold cursor-pointer">
            <a href="/">Scrumex</a>
          </h1>

          {showMobileMenu ? (
            <XIcon
              className="flex md:hidden h-7 w-7 cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <MenuIcon
              className="flex md:hidden h-7 w-7 cursor-pointer"
              onClick={toggleMenu}
            />
          )}

          <ul className="hidden md:flex gap-10">
            {location.pathname === '/' &&
              ['Home', 'About', 'Features', 'Contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section.toLowerCase()}`}
                    className="text-gray-300 text-md font-light hover:text-gray-400 
              transition duration-200 ease-out"
                  >
                    {section}
                  </a>
                </li>
              ))}
          </ul>

          <div className="hidden md:flex gap-3">
            {user ? (
              <>
                {hasLogged && (
                  <button
                    className="btn-primary--outlined"
                    onClick={async () => {
                      await logout()
                      handleCloseMobileMenu()
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Logging out...' : 'Log out'}
                  </button>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-primary--outlined">Sign in</button>
                </Link>

                <Link to="register">
                  <button className="btn-primary--filled">Sign up</button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="fixed w-full top-[64px] bottom-0 z-30 bg-slate-900">
          <ul className="flex flex-col items-center gap-10 pt-10">
            {location.pathname === '/' &&
              ['Home', 'About', 'Features', 'Contact'].map((section) => (
                <li key={section} onClick={handleCloseMobileMenu}>
                  <a
                    href={`#${section.toLowerCase()}`}
                    className="text-gray-300 text-xl font-medium hover:text-gray-400 
                  transition duration-500 ease-out"
                  >
                    {section}
                  </a>
                </li>
              ))}
            {user ? (
              <>
                {hasLogged && (
                  <li onClick={handleLogout}>
                    <button
                      className="btn-primary--outlined"
                      disabled={loading}
                    >
                      {loading ? 'Logging out...' : 'Log out'}
                    </button>
                  </li>
                )}
              </>
            ) : (
              <>
                <li onClick={handleCloseMobileMenu}>
                  <Link to="/login">
                    <button className="btn-primary--outlined">Sign in</button>
                  </Link>
                </li>
                <li onClick={handleCloseMobileMenu}>
                  <Link to="register">
                    <button className="btn-primary--filled">Sign up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
