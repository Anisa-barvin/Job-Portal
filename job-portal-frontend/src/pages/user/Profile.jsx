import { useEffect, useState } from "react";
import API from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setProfile(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
      });
    } catch {
      alert("Failed to load profile");
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
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <>
      <h2 className="dashboard-title">My Profile</h2>

      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px" }}>
        
        {/* FULL NAME */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* ROLE */}
        <div className="mb-3">
          <label className="form-label">Role</label>
          <input
            className="form-control"
            value={profile.role}
            disabled
          />
        </div>

        {/* JOINED DATE */}
        <div className="mb-3">
          <label className="form-label">Joined On</label>
          <input
            className="form-control"
            value={new Date(profile.createdAt).toLocaleDateString()}
            disabled
          />
        </div>

        {/* BUTTONS */}
        {!isEditing ? (
          <button
            className="btn btn-primary w-100"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="d-flex gap-2">
            <button
              className="btn btn-success w-100"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="btn btn-secondary w-100"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
