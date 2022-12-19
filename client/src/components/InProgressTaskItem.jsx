import { useEffect, useState } from "react";
import { updateStatus, getAllSprintTasks, getUser } from "../api";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Moment from "react-moment";

const InProgressTaskItem = ({
  task,
  idx,
  setInProgressTasks,
  inProgressTasks,
  setDoneTasks,
  doneTasks,
}) => {
  const { projectId } = useParams();
  const { sprintId } = useParams();
  const [loading, setLoading] = useState(false);
  const [taskCreator, setTaskCreator] = useState("");

  const changeStatus = () => {
    const updateTaskStatus = async () => {
      setLoading(true);
      const { data } = await updateStatus(projectId, sprintId, task.id, "done");

      setInProgressTasks(inProgressTasks.filter((t) => t.id !== task.id));
      setDoneTasks([...doneTasks, data]);
      toast("Task was done successfully!");
      setLoading(false);
    };

    updateTaskStatus();
  };

  useEffect(() => {
    const getTaskUser = async () => {
      const { data } = await getUser(task.user_id);
      setTaskCreator(data.first_name + " " + data.last_name);
    };

    getTaskUser();
  }, []);

  return (
    <>
      {loading ? (
        <div className="p-4">
          <Spinner color="text-indigo-500" />
        </div>
      ) : (
        <div className="mt-4 ml-2">
          <div className="flex flex-col border-0 rounded-lg bg-slate-200 my-5 p-2">
            <p className="mt-1 ml-2 font-sans text-black text-sm lg:text-xl">
              Task #{idx + 1}
            </p>

            <p className="mt-1 ml-2 font-sans text-zinc-400 text-sm lg:text-lg">
              {task.description}
            </p>

            <p className="mt-1 ml-2 font-sans text-zinc-400 text-sm lg:text-lg">
              Created:{" "}
              <Moment fromNow>{new Date(task.created_at).getTime()}</Moment>
            </p>

            <p className="mt-1 ml-2 font-sans text-zinc-400 text-sm lg:text-lg">
              by {taskCreator}
            </p>

            <button
              className="btn-primary--filled from-green-600 to-green-600 mt-2 mx-auto px-8 py-2 lg:px-6 text-[8px] xl:text-[13px]"
              onClick={changeStatus}
            >
              MARK AS DONE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InProgressTaskItem;
