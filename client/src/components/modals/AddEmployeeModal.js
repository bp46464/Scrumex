import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { GrFormClose } from "react-icons/gr";
import { useAuth } from "../../context";

import Spinner from "../Spinner";
import { addUserToProject, getUsers } from "../../api";
import { useParams } from "react-router-dom";

const CreateProjectModal = ({ setOpenEmployeeModal }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { projectId } = useParams();

  const filterUsers = async (value) => {
    setLoading(true);
    const { data } = await getUsers();

    if (value) {
      setUsers(
        data.filter((el) => {
          let fullName = el.first_name + " " + el.last_name;
          if (fullName.toLowerCase().includes(value.toLowerCase())) {
            return el;
          }
        })
      );
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value) {
      filterUsers(e.target.value);
    } else {
      setUsers([]);
    }
  };

  const handleClick = async (userId) => {
    setLoading(true);
    setLoading(false);

    await addUserToProject(projectId, userId);

    toast("Successfully added new employee!");
    setOpenEmployeeModal(false);
  };

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
          onClick={() => setOpenEmployeeModal(false)}
        />
        <h3 className="text-gray-800 font-bold text-3xl mb-6">Add Employee</h3>

        <div>
          <form className="w-full px-8 flex flex-col gap-4">
            <div className="relative mt-2 w-full">
              <input
                id="name"
                name="name"
                className={`peer w-full h-11 border-b-2 bg-transparent
              border-gray-400
                focus:outline-none focus:border-indigo-600 placeholder-transparent text-gray-800`}
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={handleChange}
              />
              <label
                htmlFor="name"
                className="form-label peer-placeholder-shown:text-gray-400"
              >
                Name
              </label>

              <span className="text-red-800 inline-block pt-2"></span>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="mt-4">
            <Spinner color="text-indigo-500" />
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            {users?.map((user) => (
              <div
                className="flex gap-3 py-2 px-4 rounded-md items-center cursor-pointer hover:bg-gray-200 transition-all"
                onClick={() => handleClick(user.id)}
              >
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-indigo-500">
                  {user.first_name[0]}
                  {user.last_name[0]}
                </div>
                <p className="text-lg text-gray-700">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CreateProjectModal;
