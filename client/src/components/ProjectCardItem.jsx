import { BsFillPeopleFill, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { deleteProject, getProjectUsers } from "../api";
import { useAuth } from "../context";
import Spinner from "./Spinner";

const ProjectCardItem = ({ project, projects, setProjects }) => {
  const [users, setUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const getAllUsersFromProject = async () => {
      if (project.id) {
        const { data } = await getProjectUsers(project.id);
        setUsers(data.length + 1);
      }
    };

    getAllUsersFromProject();
  }, []);

  const handleDelete = async (projectId) => {
    setLoading(true);
    await deleteProject(project.id);
    const filteredProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(filteredProjects);
    setLoading(false);
    toast("Successfully deleted project!");
  };

  return (
    <div className="p-3 box-content shadow-lg shadow-indigo-900 border-2 rounded-lg w-11/12 mt-3 bg-indigo-900 border-indigo-300">
      {loading ? (
        <Spinner color="text-indigo-500" />
      ) : (
        <>
          <p className="mt-3 ml-3 font-sans text-4xl">
            {" "}
            {project.projectName}{" "}
          </p>

          <p className="mt-1 ml-4 font-sans font-light text-lg text-neutral-400">
            {" "}
            {project.description}{" "}
          </p>

          <p className="mt-6 ml-3 tracking-wide font-sans text-lg">
            {" "}
            Project Manager: John Smith{" "}
          </p>

          <p className="mt-2 ml-3 tracking-wide font-sans text-lg">
            {" "}
            Team: Wild Weasels{" "}
          </p>

          <p className="flex flex-row gap-4 mt-2 ml-3 font-sans text-2xl">
            {" "}
            <BsFillPeopleFill className="text-3xl" />
            {users}
          </p>

          <Link to={`/dashboard/projects/${project.id}`}>
            <button className="btn-primary--filled mx-3 my-4 px-12">
              {" "}
              SEE DETAILS{" "}
            </button>
          </Link>

          {project.pmid === user.id && (
            <div className="inline-flex">
              <button
                className="btn-primary--filled from-red-500 to-red-500 mx-3 my-4 px-12"
                onClick={() => handleDelete(project.id)}
              >
                <BsFillTrashFill className="inline-flex mr-2" />
                <span>DELETE</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectCardItem;
