import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../owner_styles/Registration.css"; 

export function Owner_Register() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [ownerData, setOwnerData] = useState({
    name: "",
    ownerphone: "",
    hostelname: "",
    hosteladdress: "",
    ownerpassword: "",
  });
  const [registrationMessage, setRegistrationMessage] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,10}$/;
    return passwordPattern.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(ownerData.ownerpassword)) {
      setPasswordError(
        "Password must be 5-10 characters long, contain at least one letter, one number, and one symbol."
      );
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/owner/register?city=${selectedLocation}`,
        ownerData
      );
      setRegistrationMessage(true);
      setOwnerData({
        name: "",
        ownerphone: "",
        hostelname: "",
        hosteladdress: "",
        ownerpassword: "",
      });
      setSelectedLocation("");
      setPasswordError("");
    } catch (e) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h1 className="header-text inside-background">🚀 Hostel King 👑 - Register Your Kingdom!</h1>

      <p className="link-text inside-background">
        Don't have a username yet?{" "}<br />
        <Link to="/owner/generate-username" className="inside-background">Click here to generate one!</Link>
      </p>

      <form onSubmit={handleRegister} className="register-form inside-background">
        <input
          type="text"
          name="name"
          placeholder="Owner Name"
          value={ownerData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="ownerphone"
          placeholder="Phone Number"
          value={ownerData.ownerphone}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="hostelname"
          placeholder="Hostel Name"
          value={ownerData.hostelname}
          onChange={handleChange}
          required
          className="input-field"
        />
        <textarea
          name="hosteladdress"
          placeholder="Full Hostel Address"
          value={ownerData.hosteladdress}
          onChange={handleChange}
          required
          className="textarea-field inside-background" 
        ></textarea>
        <input
          type="password"
          name="ownerpassword"
          placeholder="Password (5-10 characters, 1 letter, 1 number, 1 symbol)"
          value={ownerData.ownerpassword}
          onChange={(e) => {
            handleChange(e);
            setPasswordError("");
          }}
          required
          className="input-field"
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        
        <label className="location-label inside-background"><strong className="inside-background">Choose location from below boss⚡</strong></label>
        <select
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
          }}
          required
          className="select-field inside-background"
        >
          <option value="">-- Select Location --</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Vijayawada">Vijayawada</option>
        </select>
        <button type="submit" className="submit-button">Register</button>
      </form>

      {registrationMessage && <p className="success-message inside-background">Registered successfully :)</p>}<br/>

      <p className="link-text inside-background">
        Already registered? <br/><Link to="/owner/login" className="inside-background">Login here</Link>
      </p>
    </div>
  );
}
