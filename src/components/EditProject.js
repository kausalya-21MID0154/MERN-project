import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(
        `https://project-6v1z.onrender.com/api/projects/${id}`
      );
      const data = await response.json();
      if (response.ok) {
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setTeamMembers(data.teamMembers);
      } else {
        setError("Error fetching project");
      }
    } catch (error) {
      setError("Error fetching project");
    }
  };

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", status: "pending" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleDeleteMember = async (index) => {
    try {
      const response = await fetch(
        `https://project-6v1z.onrender.com/api/projects/${id}/team-members/${index}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedMembers = teamMembers.filter((_, i) => i !== index);
        setTeamMembers(updatedMembers);
        alert("Team member deleted successfully");
      } else {
        setError("Error deleting team member");
      }
    } catch (error) {
      setError("Error deleting team member");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "completed") {
      const allMembersCompleted = teamMembers.every(
        (member) => member.status === "completed"
      );
      if (!allMembersCompleted) {
        alert(
          "All team members must have completed status before marking the project as completed."
        );
        return;
      }
    }

    try {
      const response = await fetch(
        `https://project-6v1z.onrender.com/api/projects/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            status,
            teamMembers,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Project updated successfully");
        navigate("/projects");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error updating project");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <h3>Team Members</h3>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={member.role}
              onChange={(e) =>
                handleMemberChange(index, "role", e.target.value)
              }
              required
            />
            <select
              value={member.status}
              onChange={(e) =>
                handleMemberChange(index, "status", e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button type="button" onClick={() => handleDeleteMember(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddMember}>
          Add Team Member
        </button>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default EditProject;
