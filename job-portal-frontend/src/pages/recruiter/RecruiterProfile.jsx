import { useEffect, useState } from "react";
import API from "../../services/api";
import Spinner from "../../components/Spinner";
import "./RecruiterProfile.css";
function RecruiterProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
          setLoading(true);
      const res = await API.get("/auth/profile");
      setProfile(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
        companyName: res.data.companyName || "",
      });
      setError("");
    } catch {
      alert("Failed to load profile");
      setError("Failed to load applications");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put("/auth/profile", formData);
      alert("Profile updated successfully");
      setIsEditing(false);
      fetchProfile(); // refresh data
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };


  // 🔄 LOADING STATE
  if (loading) {
    return <Spinner message="Loading profile..." />;
  }

  // ❌ ERROR STATE
  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  if (!profile) return <p>Loading profile...</p>;

  // return (
  //   <>
  //     <h2 className="dashboard-title">Profile</h2>

  //     <div className="card p-4 shadow-sm" style={{ maxWidth: "500px" }}>
        
  //       <div className="mb-3">
  //         <label className="form-label">Company Name</label>
  //         <input
  //           className="form-control"
  //           name="companyName"
  //           value={formData.companyName}
  //           onChange={handleChange}
  //           disabled={!isEditing}
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label className="form-label">Recruiter Name</label>
  //         <input
  //           className="form-control"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           disabled={!isEditing}
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label className="form-label">Email</label>
  //         <input
  //           className="form-control"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           disabled={!isEditing}
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label className="form-label">Role</label>
  //         <input
  //           className="form-control"
  //           value={profile.role}
  //           disabled
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label className="form-label">Joined On</label>
  //         <input
  //           className="form-control"
  //           value={new Date(profile.createdAt).toLocaleDateString()}
  //           disabled
  //         />
  //       </div>

  //       {!isEditing ? (
  //         <button
  //           className="btn btn-primary w-100"
  //           onClick={() => setIsEditing(true)}
  //         >
  //           Edit Profile
  //         </button>
  //       ) : (
  //         <div className="d-flex gap-2">
  //           <button
  //             className="btn btn-success w-100"
  //             onClick={handleUpdate}
  //           >
  //             Save
  //           </button>
  //           <button
  //             className="btn btn-secondary w-100"
  //             onClick={() => setIsEditing(false)}
  //           >
  //             Cancel
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

  return (
  <div className="recruiter-profile-wrapper">

    {/* HEADER */}
    <div className="recruiter-profile-header">
      <h2>Company Profile</h2>
      <p>Manage your recruiter and company information</p>
    </div>

    {/* PROFILE CARD */}
    <div className="recruiter-profile-card">

      {/* LEFT SIDE */}
      <div className="recruiter-profile-left">

        <div className="recruiter-profile-avatar">
          {formData.companyName
            ? formData.companyName.charAt(0).toUpperCase()
            : "C"}
        </div>

        <h4>{formData.companyName || "Company"}</h4>
        <p>{profile.email}</p>

        <span className="recruiter-role-badge">
          {profile.role}
        </span>

      </div>

      {/* RIGHT SIDE FORM */}
      <div className="recruiter-profile-form">

        {/* COMPANY NAME */}
        <div className="mb-3">
          <label className="profile-label-modern">
            Company Name
          </label>
          <input
            className="form-control profile-input-modern"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* RECRUITER NAME */}
        <div className="mb-3">
          <label className="profile-label-modern">
            Recruiter Name
          </label>
          <input
            className="form-control profile-input-modern"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="profile-label-modern">
            Email Address
          </label>
          <input
            className="form-control profile-input-modern"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* JOIN DATE */}
        <div className="mb-4">
          <label className="profile-label-modern">
            Joined On
          </label>
          <input
            className="form-control profile-input-modern"
            value={new Date(profile.createdAt).toLocaleDateString()}
            disabled
          />
        </div>

        {/* BUTTONS */}
        {!isEditing ? (
          <button
            className="recruiter-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="d-flex gap-3">
            <button
              className="recruiter-save-btn w-100"
              onClick={handleUpdate}
            >
              Save Changes
            </button>

            <button
              className="recruiter-cancel-btn w-100"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  </div>
);

}

export default RecruiterProfile;
