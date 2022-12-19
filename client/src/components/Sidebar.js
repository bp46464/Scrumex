import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { FaProjectDiagram } from 'react-icons/fa'
import { BsFillPeopleFill, BsBarChartFill } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024)
  const location = useLocation()

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true)
      } else {
        setShowSidebar(false)
      }
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  })

  return (
    <>
      <div className="fixed top-[80px] m-2 block lg:hidden z-20">
        <HiMenuAlt2
          className="text-gray-200 text-3xl cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />{' '}
      </div>{' '}
      {showSidebar && (
        <motion.div
          className="fixed top-20 md:w-[250px] bottom-0 rounded-tr-3xl rounded-br-3xl bg-indigo-900"
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
        >
          <nav className="flex justify-center shadow-2xl shadow-indigo-900">
            <ul className="flex flex-col items-center mt-36 w-full">
              <NavLink
                to=""
                className={`flex gap-4 w-full border-r-4 ${
                  location.pathname === '/dashboard'
                    ? 'border-indigo-500'
                    : 'border-transparent'
                } hover:border-indigo-500 py-3 items-center px-6 lg:px-12 text-xl text-gray-50 font-medium cursor-pointer`}
              >
                <MdOutlineSpaceDashboard className="text-3xl text-indigo-400" />{' '}
                Dashboard{' '}
              </NavLink>{' '}
              <NavLink
                to="projects"
                className={`flex gap-4 w-full border-r-4 ${
                  location.pathname.includes('projects')
                    ? 'border-indigo-500'
                    : 'border-transparent'
                } hover:border-indigo-500 py-3 items-center px-6 lg:px-12 text-xl text-gray-50 font-medium cursor-pointer`}
              >
                <FaProjectDiagram className="text-3xl text-indigo-400" />{' '}
                Projects{' '}
              </NavLink>{' '}
              <NavLink
                to="teams"
                className={`flex gap-4 w-full border-r-4 ${
                  location.pathname.includes('teams')
                    ? 'border-indigo-500'
                    : 'border-transparent'
                } hover:border-indigo-500 py-3 items-center px-6 lg:px-12 text-xl text-gray-50 font-medium cursor-pointer`}
              >
                <BsFillPeopleFill className="text-3xl text-indigo-400" /> Teams{' '}
              </NavLink>{' '}
              <NavLink
                to="leaderboard"
                className={`flex gap-4 w-full border-r-4 ${
                  location.pathname.includes('leaderboard')
                    ? 'border-indigo-500'
                    : 'border-transparent'
                } hover:border-indigo-500 py-3 items-center px-6 lg:px-12 text-xl text-gray-50 font-medium cursor-pointer`}
              >
                <BsBarChartFill className="text-5xl text-indigo-400" />
                Leaderboard{' '}
              </NavLink>{' '}
              <NavLink
                to="settings"
                className={`flex gap-4 w-full border-r-4 ${
                  location.pathname.includes('settings')
                    ? 'border-indigo-500'
                    : 'border-transparent'
                } hover:border-indigo-500 py-3 items-center px-6 lg:px-12 text-xl text-gray-50 font-medium cursor-pointer`}
              >
                <AiFillSetting className="text-3xl text-indigo-400" /> Settings{' '}
              </NavLink>{' '}
            </ul>{' '}
          </nav>{' '}
        </motion.div>
      )}{' '}
    </>
  )
}

export default Sidebar
