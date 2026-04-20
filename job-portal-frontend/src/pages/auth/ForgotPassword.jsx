import { useState } from "react";
import API from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      alert("Reset link sent to your email");
    } catch {
      alert("Failed to send reset link");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
