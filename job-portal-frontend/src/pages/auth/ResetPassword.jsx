import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      alert("Password reset successful");
      navigate("/login");
    } catch {
      alert("Reset failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <form onSubmit={submitHandler}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
