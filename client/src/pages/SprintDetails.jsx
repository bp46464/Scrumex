import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Spinner,
  ToDoTaskItem,
  InProgressTaskItem,
  DoneTaskItem,
  ProjectDetailsItem,
} from '../components'
import { getAllSprintTasks, getProject } from '../api'
import { motion } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'
import CreateTaskModal from '../components/modals/CreateTaskModal'
import { BsChevronLeft } from 'react-icons/bs'

const SprintDetails = () => {
  const { projectId } = useParams()
  const { sprintId } = useParams()
  const [tasks, setTasks] = useState([])
  const [project, setProject] = useState([])
  const [loading, setLoading] = useState(false)
  const [openTaskModal, setOpenTaskModal] = useState(false)

  const navigate = useNavigate()

  // const toDoTasks = tasks.filter(task => task.status.toLowerCase() === 'to do')
  // const inProgressTasks = tasks.filter(task => task.status.toLowerCase() === 'in progress')
  // const doneTasks = tasks.filter(task => task.status.toLowerCase() === 'done')

  const [toDoTasks, setToDoTasks] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])

  useEffect(() => {
    const getSpecificProject = async () => {
      const { data } = await getProject(projectId)
      setProject(data)
    }

    const getAllTaskFromSprint = async () => {
      setLoading(true)
      const { data } = await getAllSprintTasks(projectId, sprintId)
      setTasks(data)

      setToDoTasks(data.filter((task) => task.status.toLowerCase() === 'to do'))
      setInProgressTasks(
        data.filter((task) => task.status.toLowerCase() === 'in progress')
      )
      setDoneTasks(data.filter((task) => task.status.toLowerCase() === 'done'))
      setLoading(false)
    }

    getSpecificProject()
    getAllTaskFromSprint()
  }, [])

  return (
    <>
      {openTaskModal && (
        <CreateTaskModal
          setOpenTaskModal={setOpenTaskModal}
          toDoTasks={toDoTasks}
          setToDoTasks={setToDoTasks}
        />
      )}

      <motion.div
        className="lg:ml-[300px] rounded-lg mt-36 md:mt-16 p-8 lg:p-12 border-2 border-indigo-500 mx-4 rounded-x"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
      >
        <div className="mb-6">
          <p
            className="flex gap-2 items-center text-lg text-indigo-400 cursor-pointer"
            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
          >
            <BsChevronLeft /> Go back to your project
          </p>
        </div>

        <div className="flex justify-between space-x-1">
          <h2 className="text-gray-300 text-3xl"> Sprint details </h2>
        </div>

        <div className="flex mt-8 mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-pointer font-semibold transition-all hover:scale-105"
            onClick={() => setOpenTaskModal(true)}
          >
            <AiOutlinePlus className="inline-block text-2xl" /> Create Task
          </button>
        </div>

        <div className="box-content rounded-lg w-5/6  mt-3 bg-indigo-900 shadow-lg shadow-indigo-900 border-indigo-300">
          <ProjectDetailsItem project={project} />

          <p className="mt-6 ml-6 font-sans text-3xl">
            {' '}
            Tasks for Sprint #{sprintId}{' '}
          </p>

          {!tasks.length && (
            <p className="text-gray-400 text-xl ml-6 mt-2 pb-8">
              There are no tasks in this sprint
            </p>
          )}

          {loading ? (
            <div className="p-4 ml-2">
              <Spinner color="text-indigo-500" />
            </div>
          ) : (
            <>
              {tasks.length > 0 && (
                <div className="flex">
                  <div className="mx-auto box-content border-0 rounded-lg w-1/4 my-5 px-4 bg-slate-300 flex flex-col">
                    <p className="mt-3 ml-2 text-slate-900 text-xl font-bold">
                      To Do
                    </p>

                    {toDoTasks?.map((toDoTask, idx) => (
                      <ToDoTaskItem
                        key={toDoTask.id}
                        task={toDoTask}
                        idx={idx}
                        doneTasks={doneTasks}
                        setDoneTasks={setDoneTasks}
                        toDoTasks={toDoTasks}
                        setToDoTasks={setToDoTasks}
                        inProgressTasks={inProgressTasks}
                        setInProgressTasks={setInProgressTasks}
                      />
                    ))}
                  </div>

                  <div className="mx-auto box-content border-0 rounded-lg w-1/4 my-5 px-4 bg-slate-300 shadow-lg flex flex-col">
                    <p className="mt-3 ml-2 text-slate-900 text-xl font-bold">
                      In Progress
                    </p>

                    {inProgressTasks?.map((inProgressTask, idx) => (
                      <InProgressTaskItem
                        key={inProgressTask.id}
                        task={inProgressTask}
                        idx={idx}
                        setInProgressTasks={setInProgressTasks}
                        inProgressTasks={inProgressTasks}
                        doneTasks={doneTasks}
                        setDoneTasks={setDoneTasks}
                      />
                    ))}
                  </div>

                  <div className="mx-auto box-content border-0 rounded-lg w-1/4 my-5 px-4 bg-slate-300 flex flex-col">
                    <p className="mt-3 ml-2 text-slate-900 text-xl font-bold">
                      Done
                    </p>

                    {doneTasks?.map((doneTask, idx) => (
                      <DoneTaskItem
                        key={doneTask.id}
                        task={doneTask}
                        idx={idx}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default SprintDetails
