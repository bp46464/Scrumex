import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { GrFormClose } from 'react-icons/gr'
import { createSprint } from '../../api'

import Spinner from '../Spinner'

const CreateSprintModal = ({ setOpenModal, sprints, setSprints }) => {
  const [startDate, setStartDate] = useState(0)
  const [stopDate, setStopDate] = useState(0)
  const [interval, setInterval] = useState(14)
  const [loading, setLoading] = useState(false)

  const { projectId } = useParams()

  useEffect(() => {
    updateStopDate()
  }, [interval])

  const updateStopDate = () => {
    if (startDate !== 0 && stopDate !== 0)
      setStopDate(
        new Date(new Date(startDate).getTime() + interval * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      )
  }

  const handleDateChange = (e) => {
    setStartDate(e.target.value)

    setStopDate(
      new Date(
        new Date(e.target.value).getTime() + interval * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const { data: newSprint } = await createSprint(
      projectId,
      startDate,
      stopDate,
      interval
    )
    setLoading(false)
    toast('Successfully added a new sprint!')
    setOpenModal(false)

    setSprints([...sprints, newSprint])
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
        <h3 className="text-gray-800 font-bold text-3xl mb-6">Create Sprint</h3>

        {loading ? (
          <Spinner color="text-indigo-500" />
        ) : (
          <form
            className="w-full px-8 flex flex-col gap-4"
            // onSubmit={handleSubmit(handleClick)}
          >
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Start date
            </label>
            <input
              type="date"
              className="p-3 bg-gray-400"
              value={startDate}
              onChange={handleDateChange}
            />
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Stop date: {stopDate !== 0 && stopDate}
            </label>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Interval (in days)
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={interval}
                onChange={(e) => {
                  setInterval(e.target.value)
                }}
              >
                <option>7</option>
                <option>14</option>
                <option>30</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary--filled mt-6 px-12"
              onClick={handleSubmit}
            >
              Create
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}

export default CreateSprintModal
