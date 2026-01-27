import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // store token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // redirect based on role
      if (res.data.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container-fluid login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card login-card shadow-lg">
              <div className="row g-0" style={{ minHeight: "420px" }}>

                {/* LEFT – FORM */}
                <div className="col-md-6 d-flex align-items-center">
                  <div className="w-100 px-4">

                    <h3 className="login-title">Welcome Back 👋</h3>
                    <p className="login-subtitle mb-4">
                      Login to continue to Job Portal
                    </p>

                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <button className="btn btn-primary w-100 login-btn">
                        Login
                      </button>
                    </form>

                  </div>
                </div>

                {/* RIGHT – IMAGE */}
                <div className="col-md-6 login-right d-none d-md-flex">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Login illustration"
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

export default Login;
