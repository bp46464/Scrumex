import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllSprintTasks } from '../api'

const SprintCardItem = ({ sprint, idx }) => {
  let { projectId } = useParams()

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getAllTasksFromSprint = async () => {
      const { data } = await getAllSprintTasks(projectId, sprint.id)
      setTasks(data)
    }

    getAllTasksFromSprint()
  }, [])

  return (
    <div className="flex flex-col shadow-xl rounded-lg bg-slate-200 p-6">
      <p className="mt-2 ml-2 font-sans tracking-wide text-slate-900 text-sm font-semibold lg:text-[1.3rem]">
        {' '}
        Sprint #{idx + 1}{' '}
      </p>

      <p className="mt-1 ml-2 font-light font-sans text-neutral-500 text-sm lg:text-lg">
        {' '}
        Start Date: {sprint.startDate}{' '}
      </p>

      <p className="ml-2 font-light font-sans text-neutral-500 text-sm lg:text-lg">
        {' '}
        End Date: {sprint.stopDate}{' '}
      </p>

      <p className="ml-2 font-light font-sans text-neutral-500 text-sm lg:text-lg">
        {' '}
        No. Tasks: {tasks.length}{' '}
      </p>

      <Link to={`/dashboard/projects/${projectId}/sprints/${sprint.id}`}>
        <button className="btn-primary--filled shadow-lg mt-4 my-2 ml-2 px-4 py-2 lg:px-12 text-[12px] md:text-[14px]">
          {' '}
          SEE DETAILS{' '}
        </button>
      </Link>
    </div>
  )
}

export default SprintCardItem
