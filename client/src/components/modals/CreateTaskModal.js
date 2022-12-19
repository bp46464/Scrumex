import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { GrFormClose } from 'react-icons/gr'
import { createProject, createTask } from '../../api'
import { useAuth } from '../../context'

import Spinner from '../Spinner'
import { useParams } from 'react-router-dom'

const schema = object({
  description: string().required('Description is required'),
})

const CreateTaskModal = ({ setOpenTaskModal, toDoTasks, setToDoTasks }) => {
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const { projectId, sprintId } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleClick = async ({ description }) => {
    setLoading(true)
    const { data } = await createTask(projectId, sprintId, user.id, description)
    setToDoTasks([...toDoTasks, data])
    console.log(data, 'xd')
    reset()
    setLoading(false)
    toast('Successfully added new task!')
    setOpenTaskModal(false)
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
          onClick={() => setOpenTaskModal(false)}
        />
        <h3 className="text-gray-800 font-bold text-3xl mb-6">Create a task</h3>

        {loading ? (
          <Spinner color="text-indigo-500" />
        ) : (
          <form
            className="w-full px-8 flex flex-col gap-4"
            onSubmit={handleSubmit(handleClick)}
          >
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
                placeholder="Description"
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

export default CreateTaskModal
