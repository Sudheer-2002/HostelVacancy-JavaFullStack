import { useState } from "react";
import axios from "axios";
import "../owner_styles/OwnerUsernameGeneration.css";

export function OwnerUsernameGenerate() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");

  const handleGenerateUsername = async () => {
    if (!selectedLocation) {
      alert("Please select a location");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/owner/generate-username?city=${selectedLocation}`
      );
      setGeneratedUsername(response.data);
    } catch (e) {
      alert("An error occurred while generating the username.", e);
    }
  };

  return (
    <div className="username-container">
      <h1 className="title-text inside-background">⚡ Generate Your Hostel Boss Username! ⚡</h1>
      
      <div className="username-card">
        <label className="label-text inside-background">
          Choose location from below to generate Username boss⚡
        </label>

        <select
          className="dropdown inside-background"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          required
        >
          <option value="">-- Select Location --</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Vijayawada">Vijayawada</option>
        </select>

        <button className="generate-btn" onClick={handleGenerateUsername}>
          Click to Generate
        </button>

        {generatedUsername && (
          <p className="generated-username inside-background">
            📌 This is your username: <strong className="inside-background">{generatedUsername}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
