import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { GrFormClose } from 'react-icons/gr'
import { createProject } from '../../api'
import { useAuth } from '../../context'

import Spinner from '../Spinner'

const schema = object({
  projectName: string().required('Project name is required'),
  description: string().required('Description is required'),
})

const CreateProjectModal = ({ setOpenModal, projects, setProjects }) => {
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleClick = async ({ projectName, description }) => {
    setLoading(true)

    const { data: newProject } = await createProject({
      pmid: user.id,
      projectName,
      description,
      endingDate: '2022-11-11 13:23:44',
    })

    setProjects([...projects, newProject])

    reset()
    setLoading(false)
    toast('Successfully created new project!')
    setOpenModal(false)
  }

  return (
    <motion.div
      className="fixed inset-0 grid place-items-center bg-transparent z-30"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>

      {/* Modal content */}
      <div className="fixed inset-0 max-w-[350px] m-auto p-6 flex flex-col items-center h-min justify-center bg-gray-50 rounded-lg shadow-xl z-40">
        <GrFormClose
          className="absolute p-1 top-1 right-1 text-4xl text-gray-800 cursor-pointer hover:bg-gray-300 rounded-full"
          onClick={() => setOpenModal(false)}
        />
        <h3 className="text-gray-800 font-bold text-3xl mb-6">
          Create a project
        </h3>

        {loading ? (
          <Spinner color="text-indigo-500" />
        ) : (
          <form
            className="w-full px-8 flex flex-col gap-4"
            onSubmit={handleSubmit(handleClick)}
          >
            <div className="relative mt-2 w-full">
              <input
                id="projectName"
                name="projectName"
                className={`peer w-full h-11 border-b-2 bg-transparent
              border-gray-400
                focus:outline-none focus:border-indigo-600 placeholder-transparent text-gray-800 ${
                  errors?.projectName?.message && 'focus:border-red-800'
                }`}
                type="text"
                placeholder="Project Name"
                {...register('projectName')}
              />
              <label
                htmlFor="projectName"
                className="form-label peer-placeholder-shown:text-gray-400"
              >
                Project Name
              </label>

              <span className="text-red-800 inline-block pt-2">
                {errors?.projectName?.message}
              </span>
            </div>
            <div className="relative mt-2 w-full">
              <input
                id="description"
                name="description"
                className={`peer w-full h-11 border-b-2 bg-transparent
              border-gray-400
                focus:outline-none focus:border-indigo-600 placeholder-transparent text-gray-800 ${
                  errors?.description?.message && 'focus:border-red-800'
                }`}
                type="text"
                placeholder="Team name"
                {...register('description')}
              />
              <label
                htmlFor="description"
                className="form-label peer-placeholder-shown:text-gray-400"
              >
                Description
              </label>

              <span className="text-red-800 inline-block pt-2">
                {errors?.description?.message}
              </span>
            </div>

            <button type="submit" className="btn-primary--filled mt-6 px-12">
              Create
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}

export default CreateProjectModal
