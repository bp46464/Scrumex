import { Navigate, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useAuth } from '../context'

import { GiTrophy } from 'react-icons/gi'

import Sidebar from '../components/Sidebar'

import { Projects, Teams, Leaderboard, Settings } from '.'
import { ProjectDetails, SprintDetails } from '../pages'
import { useEffect, useState } from 'react'
import { getProjects, getProjectUsers, getStats, getTrophy } from '../api'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  const DashboardContent = () => {
    const [trophy, setTrophy] = useState()
    const [projects, setProjects] = useState([])
    const { user } = useAuth()

    useEffect(() => {
      ;(async () => {
        const { data } = await getStats()
        setTrophy(data.filter((el) => el.user_id === user.id)[0])
      })()
    }, [user])

    useEffect(() => {
      ;(async () => {
        const { data } = await getProjects()

        const filteredProjects = data.filter(
          (project) => project.pmid === user.id
        )
        setProjects(filteredProjects)
      })()
    }, [user])

    console.log(projects)

    return (
      <motion.div
        className="lg:ml-[300px] mt-36 md:mt-16 p-8 lg:p-12 border-2 border-indigo-500 mx-4 rounded-xl"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
      >
        <h2 className="text-neutral-200 text-4xl "> Dashboard </h2>{' '}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8 max-w-[1000px] mx-auto">
          {' '}
          {/* Left */}{' '}
          <div className="text-center">
            <div>
              <p className="text-gray-50 text-3xl font-medium mb-3">
                {' '}
                {user.first_name + ' ' + user.last_name}
              </p>{' '}
              <GiTrophy className="inline-flex text-5xl text-yellow-500" />
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2 text-gray-300"> 8 Lvl </span>{' '}
              <div className="w-full h-6 bg-indigo-700 rounded-full"> </div>{' '}
              <span className="ml-2 text-gray-300"> 9 Lvl </span>{' '}
            </div>{' '}
            <span className="text-lg text-gray-400">
              {' '}
              Experience: {trophy?.experience}{' '}
            </span>{' '}
          </div>{' '}
          {/* Right */}{' '}
          <img
            className="w-full max-w-[300px] mx-auto"
            src="/images/trends.svg"
            alt="Trends"
          />
        </div>{' '}
        <div className="flex flex-col justify-center md:flex-row gap-6  mt-16 max-w-[1000px] mx-auto">
          {' '}
          {/* Left */}{' '}
          <div className="flex flex-col order-1 md:order-2 items-center justify-center gap-4">
            <p className="text-gray-50 text-2xl font-medium mb-3">
              Your recent projects{' '}
            </p>{' '}
            {projects?.map((project) => (
              <div className="">
                <span className="text-green-500"> {project?.projectName} </span>
              </div>
            ))}
          </div>{' '}
          {/* Right */}{' '}
          <img
            className="order-2 md:order-1 w-full max-w-[300px] mx-auto md:mx-0 mt-4"
            src="/images/todo_list.svg"
            alt="Trends"
          />
        </div>{' '}
      </motion.div>
    )
  }

  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardContent />} />{' '}
        <Route path="/projects" element={<Projects />} />{' '}
        <Route path="/projects/:projectId" element={<ProjectDetails />} />{' '}
        <Route
          path="/projects/:projectId/sprints/:sprintId"
          element={<SprintDetails />}
        />{' '}
        <Route path="/teams" element={<Teams />} />{' '}
        <Route path="/leaderboard" element={<Leaderboard />} />{' '}
        <Route path="/settings" element={<Settings />} />{' '}
      </Routes>{' '}
    </div>
  )
}

export default Dashboard
