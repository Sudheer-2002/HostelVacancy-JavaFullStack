import React, { useState, useEffect } from "react";
import axios from "axios";
import { Session_Expired } from "../session_expired";
import { useNavigate } from "react-router-dom";
import "../owner_styles/OwnerHome.css";

export function OwnerHome() {
  const [vacancyStatus, setVacancyStatus] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacancyStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/owner/home/get-vacancy",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVacancyStatus(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError(error);
        } else {
          console.error("Error fetching vacancy status:", error);
        }
      }
    };
    fetchVacancyStatus();
  }, [token]);

  const updateVacancy = (status) => {
    try {
      axios
        .put(
          "http://localhost:8080/owner/home/update-vacancy",
          { vacancy: status },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setVacancyStatus(status);
          alert(`🔥 Vacancy status updated to ${status.toUpperCase()}! 🔥`);
        });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError(error);
      } else {
        console.error("Error updating vacancy status:", error);
      }
    }
  };

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8080/owner/logout",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.removeItem("jwtToken");
    navigate("/", { replace: true });
  };

  const handleDelete = async () => {
    if (window.confirm("❗ Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem("jwtToken");
        
        await axios.delete("http://localhost:8080/owner/delete", {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("jwtToken");
        navigate("/", { replace: true });
        alert("💔 Your account has been successfully deleted!");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("❌ Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <div className="owner-home-container">
      <nav className="navbar">
        <h2 className="dashboard-title inside-background">🏨 Hostel Owner Dashboard 🏨</h2>
        <div className="nav-buttons inside-background">
          <button className="profile-btn " onClick={() => navigate("/owner/profile")}>👤 My Profile</button>
          <button className="logout-btn " onClick={handleLogout}>🚪 Logout</button>
          <button className="logout-btn" onClick={handleDelete}>❌ Delete Account</button>
        </div>
      </nav>

      <div className="vacancy-card">
        <h3 className="inside-background textcolor">🔥 Manage Your Hostel Vacancy 🔥</h3>
        <p className="vacancy-status inside-background">
          Your current status: <strong className="inside-background">{vacancyStatus}</strong>
        </p>
        <p className="vacancy-message inside-background">
          Got empty rooms? <br/>
          Set it to **vacancy** and let the magic happen. <br/>
          No rooms left? Mark it **no vacancy** and take a well-deserved break! 😉
        </p>
        <div className="vacancy-buttons inside-background">
          <button className="vacancy-btn" onClick={() => updateVacancy("vacancy")}>💚 Set Vacancy</button>
          <button className="no-vacancy-btn" onClick={() => updateVacancy("no-vacancy")}>💔 Set No Vacancy</button>
        </div>
      </div>

      {error && <Session_Expired error={error} />}
    </div>
  );
}
