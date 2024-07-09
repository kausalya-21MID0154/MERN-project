import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <header>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.username} !</span>
            <Link to="/projects">View Projects</Link>
            <Link to="/create-project">Create New Project</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h1>Project Management Tool</h1>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
