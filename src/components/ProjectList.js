import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [filter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://project-6v1z.onrender.com/api/projects"
      );
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      } else {
        setError("Error fetching projects");
      }
    } catch (error) {
      setError("Error fetching projects");
    }
  };

  const filterProjects = () => {
    switch (filter) {
      case "completed":
        setFilteredProjects(
          projects.filter((project) => project.status === "completed")
        );
        break;
      case "pending":
        setFilteredProjects(
          projects.filter((project) => project.status === "pending")
        );
        break;
      default:
        setFilteredProjects(projects);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://project-6v1z.onrender.com/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Project deleted successfully");
        fetchProjects();
      } else {
        setError("Error deleting project");
      }
    } catch (error) {
      setError("Error deleting project");
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      {error && <p className="error">{error}</p>}
      <div className="filter-controls">
        <button onClick={() => setFilter("all")}>Show All</button>
        <button onClick={() => setFilter("completed")}>Show Completed</button>
        <button onClick={() => setFilter("pending")}>Show Pending</button>
      </div>
      {filteredProjects.length === 0 ? (
        <div className="center">
          <p>No projects found. Would you like to create a new project?</p>
          <Link to="/create-project">
            <button>Create New Project</button>
          </Link>
        </div>
      ) : (
        <div className="project-list">
          {filteredProjects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
              <h4>Team Members:</h4>
              <ul>
                {project.teamMembers.map((member, index) => (
                  <li key={index}>
                    {member.name} - {member.role} - ({member.status})
                  </li>
                ))}
              </ul>
              <div className="actions">
                <Link to={`/edit-project/${project._id}`}>Edit</Link>
                <button onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
