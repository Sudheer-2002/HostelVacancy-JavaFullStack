import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../owner_styles/Profile.css";

export function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    userusername: "",
    fname: "",
    lname: "",
    useremail: "",
    userphone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:8080/user/profile/update",
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profiile");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2 className="dashboard-title">User Profile</h2>
        <button onClick={() => navigate("/user/home")}>Back to Home</button>
      </nav>

      <div className="profile-container">
        <h3 className="text">Profile Details</h3>
        <div className="profile-card">
          {error ? (
            <p className="inside-background">
              Error fetching profile data. Please try again.
            </p>
          ) : (
            <form className="inside-background">
              <label className="inside-background">Username:</label>
              <input
                type="text"
                name="userusername"
                value={userDetails.userusername}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <br />

              <label className="inside-background">First Name:</label>
              <input
                type="text"
                name="fname"
                value={userDetails.fname}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <br />

              <label className="inside-background">Last Name:</label>
              <input
                type="text"
                name="lname"
                value={userDetails.lname}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <br />

              <label className="inside-background">Email:</label>
              <input
                type="text"
                name="useremail"
                value={userDetails.useremail}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <br />
              <label className="inside-background">Phone Number:</label>
              <input
                type="text"
                name="userphone"
                value={userDetails.userphone}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <div className="profile-buttons inside-background">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="save-btn"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="edit-btn inside-background"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
