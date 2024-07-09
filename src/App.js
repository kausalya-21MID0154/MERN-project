import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import EditProject from "./components/EditProject";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/projects"
            element={
              user ? <ProjectList user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-project"
            element={
              user ? <ProjectForm user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit-project/:id"
            element={
              user ? <EditProject user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/projects" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
