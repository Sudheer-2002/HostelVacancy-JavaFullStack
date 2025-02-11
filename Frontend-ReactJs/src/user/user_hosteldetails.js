import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../owner_styles/HostelOwnerDetailsinUser.css"; // CSS file for styles

export function UserHostelDetails() {
  const [searchParams] = useSearchParams();
  const vacancy_id = searchParams.get("vacancy_id");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/get-hostel?vacancy_id=${vacancy_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOwnerDetails(response.data);
      } catch (error) {
        console.error("Error fetching owner details:", error);
        alert("Failed to load hostel details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOwnerDetails();
  }, [vacancy_id, token]);

  return (
    <div className="hostel-details-container">
      <h2 className="hostel-title inside-background">Hostel Owner Details</h2>
      {loading ? (
        <div className="loading-text inside-background">Loading details...</div>
      ) : ownerDetails ? (
        <div className="owner-profile-card inside-backgroound">
          <p className="inside-background">
            <strong className="inside-background">Name:</strong> {ownerDetails.owner.name}
          </p>
          <p className="inside-background">
            <strong className="inside-background">Hostel Name:</strong> {ownerDetails.owner.hostelname}
          </p>
          <p className="inside-background">
            <strong className="inside-background">Vacancy status:</strong> {ownerDetails.vacancy}
          </p>
          <p className="inside-background">
            <strong className="inside-background">Address:</strong> {ownerDetails.owner.hosteladdress}
          </p>
          <p className="inside-background">
            <strong className="inside-background">Contact:</strong> {ownerDetails.owner.ownerphone}
          </p>
          <button className="home-button" onClick={() => navigate("/user/home")}>
            🏠 Home
          </button>
        </div>
      ) : (
        <div className="error-text">No details found.</div>
      )}
    </div>
  );
}
