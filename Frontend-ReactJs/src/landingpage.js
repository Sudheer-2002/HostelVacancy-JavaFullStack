import { replace, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../src/owner_styles/LandingPage.css";

export function Landingpage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-container">
      <h1 className="main-heading">
        🏠 Stuck Between Finding a Hostel & Filling the hostel? We've Got You!
      </h1>

      <div className="content-box">
        <img
          src="/images_folder/hostel_search.jpg"
          alt="Hostel Search"
          className="image left"
        />
        <p className="text">
          Finding the perfect hostel shouldn’t feel like a treasure hunt or a
          never-ending struggle...
        </p>
      </div>

      <div className="content-box">
        <p className="text">
          Looking for a hostel often means endless Google searches with no
          results...
        </p>
        <img
          src="\images_folder\struggle.png"
          alt="Struggle"
          className="image right"
        />
      </div>

      <div className="content-box">
        <img
          src="/images_folder/hostel_owners.jpg"
          alt="Hostel Owners"
          className="image left"
        />
        <p className="text">
          If you own a hostel, you know the pain of unoccupied beds and vacant
          rooms...
        </p>
      </div>

      <div className="content-box">
        <p className="text">
          We’ve made hostel hunting as easy as scrolling through social media!
          ✨
        </p>
        <img
          src="/images_folder/easy_search.jpg"
          alt="Easy Search"
          className="image right"
        />
      </div>

      <div className="content-box">
        <img
          src="/images_folder/no_more_struggles.avif"
          alt="No More Struggles"
          className="image left"
        />
        <p className="text">
          ❌ No more fake promises ❌ No more vague “vacancy available”
          signboards...
        </p>
      </div>

      <div className="aftercontent-box center-text">
        <h1 style={{ backgroundColor: "#f2f3f5" }}>
          🚀 Ready to Get Started? Register Now!
        </h1>
        <div style={{ backgroundColor: "#f2f3f5" }}>
          <p style={{ backgroundColor: "#f2f3f5" }}>
            👉 If you’re a{" "}
            <strong style={{ backgroundColor: "#f2f3f5" }}>Hostel Owner</strong>
            , don’t let your rooms stay empty!
            <br />
            📢{" "}
            <strong style={{ backgroundColor: "#f2f3f5" }}>
              Click the button below to register your hostel
            </strong>{" "}
            and start getting customers instantly.
          </p>
          <p style={{ backgroundColor: "#f2f3f5" }}>
            👉 If you are{" "}
            <strong style={{ backgroundColor: "#f2f3f5" }}>Looking for Hostels</strong>
            , let's forget about searching, by registering!
            <br />
            📢{" "}
            <strong style={{ backgroundColor: "#f2f3f5" }}>
              Click the button below to register
            </strong>{" "}
            and start searching hostel rooms instantly.
          </p>
        </div>

        <div style={{ backgroundColor: "#f2f3f5" }}>
          <button
            className="register-button"
            onClick={() => handleNavigate("/owner/register", {replace: true})}
          >
            Register as Owner
          </button>
          <button
            className="register-button"
            onClick={() => handleNavigate("/user/register", {replace: true})}
          >
            Register as User
          </button>
        </div>

        <p style={{ backgroundColor: "#f2f3f5" }}>
          🎯{" "}
          <strong style={{ backgroundColor: "#f2f3f5" }}>
            Already have an account?
          </strong>{" "}
          No worries! <br />
          🔑{" "}
          <strong style={{ backgroundColor: "#f2f3f5" }}>
            Login to continue your search or manage your listings.
          </strong>
        </p>
        <p style={{ backgroundColor: "#f2f3f5" }}>
          <Link to="/owner/login" onClick={() => handleNavigate("/owner/login", {replace:true})} style={{ backgroundColor: "#f2f3f5" }}>
            Owner Login
          </Link>{" "}
          |{" "}
          <Link to="/user/login" onClick={() => handleNavigate("/user/login", {replace:true})} style={{ backgroundColor: "#f2f3f5" }}>
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}
