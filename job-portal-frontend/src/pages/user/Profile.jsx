// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import Spinner from "../../components/Spinner";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     skills: "",
//   });

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/auth/profile");
//       setProfile(res.data);
//       setFormData({
//         name: res.data.name,
//         email: res.data.email,
//         skills: res.data.skills,
//       });
//       setError("");
//     } catch {
//       alert("Failed to load profile");
//       setError("Failed to load applications");
//     }finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       await API.put("/auth/profile", formData);
//       alert("Profile updated successfully");
//       setIsEditing(false);
//       fetchProfile();
//     } catch (error) {
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };
//   if (loading) {
//     return <Spinner message="Loading Profile...."/>;
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger text-center my-4">
//         {error}
//       </div>
//     );
//   }


//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <>
//       <h2 className="dashboard-title">My Profile</h2>

//       <div className="card p-4 shadow-sm" style={{ maxWidth: "500px" }}>
        
//         {/* FULL NAME */}
//         <div className="mb-3">
//           <label className="form-label">Full Name</label>
//           <input
//             className="form-control"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>

//          <div className="mb-3">
//           <label className="form-label">Skills</label>
//           <input
//             className="form-control"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>

//         {/* EMAIL */}
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             className="form-control"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>

//         {/* ROLE */}
//         <div className="mb-3">
//           <label className="form-label">Role</label>
//           <input
//             className="form-control"
//             value={profile.role}
//             disabled
//           />
//         </div>

//         {/* JOINED DATE */}
//         <div className="mb-3">
//           <label className="form-label">Joined On</label>
//           <input
//             className="form-control"
//             value={new Date(profile.createdAt).toLocaleDateString()}
//             disabled
//           />
//         </div>

//         {/* BUTTONS */}
//         {!isEditing ? (
//           <button
//             className="btn btn-primary w-100"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <div className="d-flex gap-2">
//             <button
//               className="btn btn-success w-100"
//               onClick={handleUpdate}
//             >
//               Save
//             </button>
//             <button
//               className="btn btn-secondary w-100"
//               onClick={() => setIsEditing(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Profile;



import { useEffect, useState } from "react";
import API from "../../services/api";
import Spinner from "../../components/Spinner";
import "./Profile.css";
function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/profile");

      setProfile(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
        skills: res.data.skills,
      });

      setError("");
    } catch {
      alert("Failed to load profile");
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  if (loading) {
    return <Spinner message="Loading Profile..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  if (!profile) return <p>Loading profile...</p>;

return (
  <div className="profile-page-wrapper">

    {/* HEADER CARD */}
    <div className="profile-top-card">
      <div className="profile-avatar-large">
        {profile.name?.charAt(0).toUpperCase()}
      </div>

      <div>
        <h2 className="profile-name">{profile.name}</h2>
        <p className="profile-role">{profile.role.toUpperCase()}</p>
        <small className="text-muted">
          Joined {new Date(profile.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>

    {/* FORM CARD */}
    <div className="profile-main-card">

      <div className="row">

        {/* LEFT COLUMN */}
        <div className="col-md-6">

          <label className="profile-label">Full Name</label>
          <input
            className="form-control profile-input-modern mb-3"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label className="profile-label">Skills</label>
          <input
            className="form-control profile-input-modern mb-3"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            disabled={!isEditing}
          />

        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-6">

          <label className="profile-label">Email</label>
          <input
            className="form-control profile-input-modern mb-3"
            name="email"
            value={formData.email}
           
            disabled
          />

          <label className="profile-label">Role</label>
          <input
            className="form-control profile-input-modern mb-3"
            value={profile.role}
            disabled
          />

        </div>

      </div>

      {/* BUTTON AREA */}
      <div className="profile-btn-area">
        {!isEditing ? (
          <button
            className="profile-btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="profile-btn-success"
              onClick={handleUpdate}
            >
              Save Changes
            </button>

            <button
              className="profile-btn-cancel"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>

    </div>

  </div>
);

}

export default Profile;
