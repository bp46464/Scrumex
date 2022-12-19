import ProjectCardItem from "./ProjectCardItem";
import { motion } from "framer-motion";

const ProjectCard = ({ projects, setProjects }) => {
  return (
    <>
      <div>
        {projects?.length > 0 ? (
          <motion.div
            className="grid grid-cols-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {projects?.map((project) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                projects={projects}
                setProjects={setProjects}
              />
            ))}
          </motion.div>
        ) : (
          <p className="text-2xl">You have not added any project yet</p>
        )}
      </div>
    </>
  );
};

export default ProjectCard;
