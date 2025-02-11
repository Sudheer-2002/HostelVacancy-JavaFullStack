import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../owner_styles/Registration.css";

export function User_Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userusername: "",
    fname: "",
    lname: "",
    useremail: "",
    userphone: "",
    userpassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,10}$/;
    return passwordPattern.test(password);
  };

  const handleRester = async (e) => {
    e.preventDefault();
    if (!validatePassword(userData.userpassword)) {
      setPasswordError(
        "Password must be 5-10 characters long, contain at least one letter, one number, and one symbol."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/user/register", userData);
      setRegistrationMessage(true);
      setUserData({
        userusername: "",
        fname: "",
        lname: "",
        useremail: "",
        userphone: "",
        userpassword: "",
      });
      setPasswordError("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="header-text inside-background">🚀 Hello Hunter 👑 - Let's Hunt!! so Register First!</h1>

      <form onSubmit={handleRester} className="register-form inside-background">
        <input
          type="text"
          placeholder="Username"
          name="userusername"
          value={userData.userusername}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="First Name"
          name="fname"
          value={userData.fname}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lname"
          value={userData.lname}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Email"
          name="useremail"
          value={userData.useremail}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter phone Number"
          name="userphone"
          value={userData.userphone}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Enter Password [Password (5-10 characters, 1 letter, 1 number, 1 symbol)]"
          name="userpassword"
          value={userData.userpassword}
          onChange={(e) => {
            handleChange(e);
            setPasswordError("");
          }}
          required
          className="input-field"
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit" className="submit-button">Register</button>
      </form>

      {registrationMessage && (
        <p className="success-message inside-background">Registration Successful! Please login to continue.</p>
      )}
      <p className="link-text inside-background">
        Already registered? <Link to="/user/login" className="inside-background">Login here</Link>
      </p>
    </div>
  );
}
