

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    companyName: "",
    skills: "",
  });

  const { name, email, password, role, companyName, skills } = formData;

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle register submit
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container-fluid register-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card register-card shadow-lg">
              <div className="row g-0" style={{ minHeight: "420px" }}>

                {/* LEFT – FORM */}
                <div className="col-md-6 d-flex align-items-center">
                  <div className="w-100 px-4">

                    <h3 className="register-title">Create Account 🚀</h3>
                    <p className="register-subtitle mb-4">
                      Join Job Portal and explore opportunities
                    </p>

                    <form onSubmit={handleRegister}>
                      <select
                        className="form-select mb-3"
                        name="role"
                        value={role}
                        onChange={handleChange}
                      >
                        <option value="user">Register as Job Seeker</option>
                        <option value="recruiter">Register as Recruiter</option>
                      </select>

                      <input
                        className="form-control mb-3"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={handleChange}
                        required
                      />

                      <input
                        className="form-control mb-3"
                        name="email"
                        placeholder="Email address"
                        value={email}
                        onChange={handleChange}
                        required
                      />

                      <input
                        type="password"
                        className="form-control mb-3"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                      />

                      {role === "user" && (
                        <input
                          className="form-control mb-3"
                          name="skills"
                          placeholder="Your Skills (React, Java, SQL)"
                          value={skills}
                          onChange={handleChange}
                          required
                        />
                      )}

                      {role === "recruiter" && (
                        <input
                          className="form-control mb-3"
                          name="companyName"
                          placeholder="Company Name"
                          value={companyName}
                          onChange={handleChange}
                          required
                        />
                      )}

                      <button
                        type="submit"
                        className="btn btn-success w-100 register-btn"
                      >
                        Create Account
                      </button>
                    </form>

                    <p className="text-center mt-3">
                      Already have an account?{" "}
                      <Link to="/login">Login</Link>
                    </p>

                  </div>
                </div>

                {/* RIGHT – IMAGE */}
                <div className="col-md-6 register-right d-none d-md-flex">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Register illustration"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
