import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../owner_styles/UserHome.css"; 

export function UserHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [vacancyStatus, setVacancyStatus] = useState("");
  const [hostels, setHostels] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchHostels = useCallback(async () => {
    if (!searchPerformed) return;
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("searchTerm", searchQuery);
      if (vacancyStatus.trim()) params.append("vacancyStatus", vacancyStatus);
      if (location.trim()) params.append("city", location);
      params.append("page", page);
      params.append("size", 10);
      const response = await axios.get(
        `http://localhost:8080/user/home/searchHostels?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      setHostels(response.data._embedded?.vacancyDetailsList || []);
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
      console.error("Error fetching hostels: ", error);
      alert("Error fetching hostels");
      navigate("/user/login", { replace: true });
    }
  }, [searchPerformed, searchQuery, vacancyStatus, location, page, token, navigate]);

  useEffect(() => {
    if (searchPerformed) {
      fetchHostels();
    }
  }, [searchPerformed, page]);

  const handleSearch = () => {
    if (!location.trim() && !vacancyStatus.trim() && !searchQuery.trim()) {
      alert("Please select at least one filter (Location or Vacancy Status) or a search query");
      handleClearRecords();
      return;
    }
    setPage(0);
    setSearchPerformed(true);
    fetchHostels();
  };

  const handleHostelClick = (vacancy_id) => {
    navigate(`/user/getHostel?vacancy_id=${vacancy_id}`);
  };

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8080/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    localStorage.removeItem("jwtToken");
    navigate("/", { replace: true });
  };

  const handleClearRecords = () => {
    setHostels([]);
    setSearchQuery("");
    setLocation("");
    setVacancyStatus("");
    setPage(0);
    setSearchPerformed(false);
  };

  const handleDelete = async () => {
    if (window.confirm("❗ Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem("jwtToken");
        
        await axios.delete("http://localhost:8080/user/delete", {
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
    <div>
     
      <nav className="navbar">
        <h2 className="navbarh2 inside-background">Welcome User</h2>
        <div className="nav-buttons inside-background">
          <button className="profile-btn" onClick={() => navigate("/user/profile")}>👤 My Profile</button>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
          <button className="logout-btn" onClick={handleDelete}>❌ Delete Account</button>
        </div>
      </nav>

     
      <div className="search-container">
        <input
          type="text"
          placeholder="Search hostel name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="inside-background"
        />
        <button onClick={handleSearch}>🔍Search</button>

        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <button className="inside-background " onClick={handleClearRecords}>Clear Filters / Records</button>

      </div>

      
      {showFilters && (
        <div className="filter-container">
          <select value={vacancyStatus} onChange={(e) => setVacancyStatus(e.target.value)}>
            <option value="">--Vacancy Status--</option>
            <option value="vacancy">Vacancy</option>
            <option value="no-vacancy">No Vacancy</option>
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">--Location--</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Vijayawada">Vijayawada</option>
          </select>

          <div className="pagination">
          <button className="inside-background " onClick={handleSearch}>Apply Filters</button>
          </div>
          
        </div>
      )}

      
      <div className="hostel-list">
        {hostels.length > 0 ? (
          hostels.map((hostel) => (
            <div key={hostel.vacancy_id} className="hostel-card" onClick={() => handleHostelClick(hostel.vacancy_id)}>
              <h3 className="inside-background">{hostel.owner?.hostelname}</h3>
              <p className="inside-background">{hostel.owner?.hosteladdress}</p>
              <p className="inside-background">Vacancy: {hostel.vacancy}</p>
            </div>
          ))
        ) : (
          <p className="textcolor">No hostels found!</p>
        )}
      </div>

      
      <div className="pagination textcolor">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
