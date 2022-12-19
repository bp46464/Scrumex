import { BsFillPeopleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProjectUsers } from '../api'

const ProjectDetailsItem = ({ project }) => {
  const [users, setUsers] = useState(0)

  useEffect(() => {
    const getAllUsersFromProject = async () => {
      const { data } = await getProjectUsers(project.id)
      setUsers(data.length + 1)
    }

    getAllUsersFromProject()
  }, [project])

  return (
    <div className="p-3">
      <p className="mt-3 ml-3 font-sans text-4xl"> {project.projectName} </p>

      <p className="mt-1 ml-4 font-sans text-lg text-zinc-400">
        {' '}
        {project.description}{' '}
      </p>

      <p className="mt-10 ml-3 font-sans text-xl">
        {' '}
        Project Manager: John Smith{' '}
      </p>

      <p className="mt-2 ml-3 font-sans text-xl"> Team: Wild Weasels </p>

      <p className="flex flex-row gap-4 mt-2 ml-3 font-sans text-3xl">
        {' '}
        <BsFillPeopleFill className="text-4xl" />
        {users}{' '}
      </p>
    </div>
  )
}

export default ProjectDetailsItem
