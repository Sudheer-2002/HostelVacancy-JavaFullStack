import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../owner_styles/Login.css";

export function User_Login() {
  const [credentials, setCredentials] = useState({
    userusername: "",
    userpassword: "",
  });
  const [loginmsg, setLoginmsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/user/home", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        credentials
      );

      localStorage.setItem("jwtToken", response.data);

      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
        window.history.pushState(null, "", window.location.href);
      });

      setLoginmsg("Login Successful ❤️");
      navigate("/user/home", { replace: true });
    } catch (error) {
      setLoginmsg("Invalid username or password");
      console.error(error);
      localStorage.removeItem("jwtToken");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="register-link">👑 Welcome Back, Hostel Hunter 👑</h3>
        <p className="login-message register-link">
          Empty rooms in hostels are waiting for you boss⚡! Log in and let's fill them up. 😉
        </p>
        <form onSubmit={handleSubmit} className="register-link">
          <input
            type="text"
            name="userusername"
            placeholder="Enter your username"
            value={credentials.userusername}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="userpassword"
            placeholder="Enter your password"
            value={credentials.userpassword}
            onChange={handleChange}
            required
          />
          <button type="submit">🔥 Log Me In! 🔥</button>
        </form>

        {loginmsg && <p className="login-status register-link">{loginmsg}</p>}

        <p className="register-link">
          Not registered yet? <a href="/user/register" className="register-link">Create an account</a> 😘
        </p>
      </div>
    </div>
  );
}
