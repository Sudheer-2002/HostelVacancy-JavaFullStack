import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../owner_styles/Login.css";

export function Owner_Login() {
  const [credentials, setCredentials] = useState({
    ownerusername: "",
    ownerpassword: "",
  });

  const [loginMsg, setLoginmsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/owner/home/vacancy-status", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/owner/login",
        credentials
      );

      localStorage.setItem("jwtToken", response.data);

      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
        window.history.pushState(null, "", window.location.href);
      });

      setLoginmsg("Login Successful ❤️");
      navigate("/owner/home/vacancy-status", { replace: true });
    } catch (err) {
      setLoginmsg("Oops! Wrong credentials, try again 😏");
      console.error(err);
      localStorage.removeItem("jwtToken");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="register-link">👑 Welcome Back, King of Hostels! 👑</h2>
        <p className="login-message register-link">
          Your empty rooms are waiting for tenants! Log in and let's fill them up. 😉
        </p>

        <form onSubmit={handleSubmit} className="register-link">
          <input
            type="text"
            name="ownerusername"
            placeholder="Enter your username"
            value={credentials.ownerusername}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="ownerpassword"
            placeholder="Enter your password"
            value={credentials.ownerpassword}
            onChange={handleChange}
            required
          />
          <button type="submit">🔥 Log Me In! 🔥</button>
        </form>

        {loginMsg && <p className="login-status register-link">{loginMsg}</p>}

        <p className="register-link">
          Not registered yet? <a href="/owner/register" className="register-link">Create an account</a> 😘
        </p>
      </div>
    </div>
  );
}
