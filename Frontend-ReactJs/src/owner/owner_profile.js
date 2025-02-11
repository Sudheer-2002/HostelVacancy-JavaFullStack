import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../owner_styles/Profile.css";

export function OwnerProfile() {
  const [ownerDetails, setOwnerDetails] = useState({
    name: "",
    ownerphone: "",
    hostelname: "",
    hosteladdress: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/owner/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOwnerDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setOwnerDetails({ ...ownerDetails, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:8080/owner/profile/update",
        ownerDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2 className="dashboard-title">Owner Profile</h2>
        <button onClick={() => navigate("/owner/home/vacancy-status")}>
          Back to Home
        </button>
      </nav>

      <div className="profile-container">
        <h3 className="text">Profile Details</h3>
        <div className="profile-card">
          {error ? (
            <p className="inside-background">Error fetching profile data. Please try again.</p>
          ) : (
            <form className="inside-background">
              <label className="inside-background">Name:</label>
              <input
                type="text"
                name="name"
                value={ownerDetails.name}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label className="inside-background">Phone:</label>
              <input
                type="text"
                name="ownerphone"
                value={ownerDetails.ownerphone}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label className="inside-background">Hostel Name:</label>
              <input
                type="text"
                name="hostelname"
                value={ownerDetails.hostelname}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label className="inside-background">Hostel Address:</label>
              <input
                type="text"
                name="hosteladdress"
                value={ownerDetails.hosteladdress}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <div className="profile-buttons inside-background">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="edit-btn inside-background"
                    onClick={handleEdit}
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
