import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import { Spinner } from "../components";
import { deleteUser, updateUser } from "../api";

const schema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
});

const DeleteModal = ({ setShowDeleteModal, userId }) => {
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  const handleDelete = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setShowDeleteModal(false);
      logout();
      await deleteUser(userId);
    }, 3000);
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
      <div className="fixed inset-0 max-w-[350px] m-auto p-6 px-10 flex flex-col items-center h-min justify-center bg-gray-50 rounded-lg shadow-xl z-40">
        <GrFormClose
          className="absolute p-1 top-1 right-1 text-4xl text-gray-800 cursor-pointer hover:bg-gray-300 rounded-full"
          onClick={() => setShowDeleteModal(false)}
        />
        <h3 className="text-gray-800 font-bold text-3xl mb-6">
          Delete Account
        </h3>

        {loading ? (
          <p className="text-gray-500 font-bold text-lg">
            <div>Deleting your account...</div>
            <div className="flex justify-center items-center mt-3">
              <Spinner color="text-red-500" />
            </div>
          </p>
        ) : (
          <>
            <div className="w-[250px]">
              <img
                src="../images/delete_account.svg"
                alt="delete account icon"
              />
            </div>

            <p className="text-gray-500 font-bold text-lg mt-8">
              Are you sure you want to delete your account? You will lose all of
              your points and you will not be able to restore your tasks
              history!
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="btn-primary--outlined border-gray-500 bg-gray-500 text-white mt-12 px-12"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary--filled from-red-500 to-red-500 px-12"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const Settings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({ firstName: user.first_name, lastName: user.last_name });
  }, [user]);

  const handleUpdate = async ({ firstName, lastName }) => {
    setLoading(true);
    const { data } = await updateUser(user.id, firstName, lastName);
    setUser(data);
    reset();
    toast("Successfully updated your profile data!");
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteModal setShowDeleteModal={setShowDeleteModal} userId={user.id} />
      )}

      <motion.div
        className="lg:ml-[300px] mt-36 md:mt-16 p-8 lg:p-12 border-2 border-indigo-500 mx-4 rounded-xl"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
      >
        <h2 className="text-gray-300 text-3xl">Settings</h2>
        <p className="text-3xl text-gray-300 mt-8 mb-8">
          Change your profile data
        </p>

        {loading ? (
          <div>
            <Spinner color="text-indigo-500" />
          </div>
        ) : (
          <form
            className="w-full mt-5 flex flex-col gap-4"
            onSubmit={handleSubmit(handleUpdate)}
          >
            <div className="relative mt-2 w-full">
              <input
                id="firstName"
                name="firstName"
                className={`peer h-11 border-b-2 bg-transparent
              border-gray-400
                focus:outline-none focus:border-indigo-600 placeholder-transparent text-gray-100 ${
                  errors?.firstName?.message && "focus:border-red-800"
                }`}
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />
              <label
                htmlFor="firstName"
                className="form-label peer-placeholder-shown:text-gray-400"
              >
                First Name
              </label>

              <span className="text-red-800 block pt-2">
                {errors?.firstName?.message}
              </span>
            </div>

            <div className="relative mt-2 w-full">
              <input
                id="lastName"
                name="lastName"
                className={`peer h-11 border-b-2 bg-transparent
              border-gray-400
                focus:outline-none focus:border-indigo-600 placeholder-transparent text-gray-100 ${
                  errors?.lastName?.message && "focus:border-red-800"
                }`}
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
              <label
                htmlFor="lastName"
                className="form-label peer-placeholder-shown:text-gray-400"
              >
                Last Name
              </label>

              <span className="text-red-800 block pt-2">
                {errors?.lastName?.message}
              </span>
            </div>

            <button
              type="submit"
              className="btn-primary--filled mt-6 px-12 max-w-[200px]"
            >
              Update
            </button>
          </form>
        )}

        <button
          type="submit"
          className="btn-primary--filled from-red-900 to-red-900 opacity-50 hover:opacity-100 hover:from-red-600 hover:to-red-600 mt-12 px-12 max-w-[300px]"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </motion.div>
    </>
  );
};

export default Settings;
