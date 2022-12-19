import React from 'react'
import Moment from 'react-moment'

const DoneTaskItem = ({ task, idx }) => {
  return (
    <div className="mt-4 ml-2">
      <div className="box-content border-0 rounded-lg bg-slate-200 my-5 p-2">
        <p className="mt-1 ml-2 font-sans text-black text-sm lg:text-xl">
          Task #{idx + 1}
        </p>

        <p className="mt-1 ml-2 font-sans text-zinc-400 text-sm lg:text-lg">
          {task.description}
        </p>

        <p className="mt-1 ml-2 font-sans text-zinc-400 text-sm lg:text-lg">
          Done: <Moment fromNow>{new Date(task.updated_at).getTime()}</Moment>
        </p>
      </div>
    </div>
  )
}

export default DoneTaskItem
