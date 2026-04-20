
// import { useState } from "react";
// import "./UserDashboard.css";
// import Navbar from "../../components/Navbar";

// import DashboardHome from "./DashboardHome";
// import BrowseJobs from "./BrowseJobs";
// import MyApplications from "./MyApplications";
// import Profile from "./Profile";

// function UserDashboard() {
//   const [active, setActive] = useState("dashboard");

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const renderContent = () => {
//     switch (active) {
//       case "dashboard":
//         return <DashboardHome />;
//       case "browse":
//         return <BrowseJobs />;
//       case "applications":
//         return <MyApplications />;
//       case "profile":
//         return <Profile />;
//       default:
//         return <DashboardHome />;
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container-fluid user-dashboard">
//         <div className="row">

//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2 sidebar">
//             <h4>Job Portal</h4>

//             <button onClick={() => setActive("dashboard")}>Dashboard</button>
//             <button onClick={() => setActive("browse")}>Browse Jobs</button>
//             <button onClick={() => setActive("applications")}>My Applications</button>
//             <button onClick={() => setActive("profile")}>Profile</button>
//             <button onClick={handleLogout} className="text-danger">
//               Logout
//             </button>
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10 dashboard-content">
//             {renderContent()}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default UserDashboard;






// import { useState } from "react";
//  import "./UserDashboard.css";
//   import Navbar from "../../components/Navbar"; 
//   import DashboardHome from "./DashboardHome"; 
//   import BrowseJobs from "./BrowseJobs"; 
//   import MyApplications from "./MyApplications"; 
//   import Profile from "./Profile"; 
//   import SavedJobs from "./SavedJobs";
// import RecommendedJobs from "./RecommendedJobs";
// import UserNavbar from "../../components/UserNavbar";

//   function UserDashboard() { 
//     const [active, setActive] = useState("dashboard"); 
//     const handleLogout = () => { 
//       localStorage.clear(); 
//       window.location.href = "/login"; };
       
//       const renderContent = () => { 
//         switch (active) { 
//           case "dashboard":  return <DashboardHome />; 
//           case "browse": return <BrowseJobs />; 
//           case "applications": return <MyApplications />; 
//           case "profile": return <Profile />; 
//           case "saved":return <SavedJobs />;
//           case "recommended": return <RecommendedJobs />;
//           default: return <DashboardHome />;
//          } }; 
         
//          return (
          
//           <> 
//           <UserNavbar />
//           <div className="container-fluid user-dashboard"> 
//             <div className="row"> 
              
//               {/* SIDEBAR */} 
              
//               <div className="col-md-3 col-lg-2 sidebar"> 
                
//                 <h4>Job Portal</h4> 
//                 <button onClick={() => setActive("dashboard")}>Dashboard</button> 
//                 <button onClick={() => setActive("browse")}>Browse Jobs</button> 
//                 <button onClick={() => setActive("applications")}>My Applications</button> 
//                 <button onClick={() => setActive("profile")}>Profile</button>
//                 <button onClick={() => setActive("saved")}> Saved Jobs</button>
//                 <button onClick={() => setActive("recommended")}> Recommended Jobs</button>
                
//                  <button onClick={handleLogout} className="text-danger"> Logout </button> 
                 
//                  </div> {/* MAIN CONTENT */}
                 
//                   <div className="col-md-9 col-lg-10 dashboard-content"> 
//                     {renderContent()} 
//                    </div> 
                  
//              </div> 
//           </div> 
//         </>
//  ); 
//     } 
                    
// export default UserDashboard;










// import { useState } from "react";
// import "./UserDashboard.css";
// import DashboardHome from "./DashboardHome";
// import BrowseJobs from "./BrowseJobs";
// import MyApplications from "./MyApplications";
// import Profile from "./Profile";
// import SavedJobs from "./SavedJobs";
// import RecommendedJobs from "./RecommendedJobs";
// import UserNavbar from "../../components/UserNavbar";

// function UserDashboard() {
//   const [active, setActive] = useState("dashboard");

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const renderContent = () => {
//     switch (active) {
//       case "dashboard":
//         return <DashboardHome />;
//       case "browse":
//         return <BrowseJobs />;
//       case "applications":
//         return <MyApplications />;
//       case "profile":
//         return <Profile />;
//       case "saved":
//         return <SavedJobs />;
//       case "recommended":
//         return <RecommendedJobs />;
//       default:
//         return <DashboardHome />;
//     }
//   };

//   return (
//     <>
//       <UserNavbar setActive={setActive} />


//       <div className="container-fluid user-dashboard-modern">
//         <div className="row">

//           {/* ⭐ MODERN SIDEBAR */}
//           <div className="col-md-3 col-lg-2 sidebar-modern">

//             <div className="sidebar-logo">
//               <h4>🚀 Job Portal</h4>
             
//             </div>

//             <div className="sidebar-menu">

//               <button
//                 className={`sidebar-btn ${active === "dashboard" ? "active" : ""}`}
//                 onClick={() => setActive("dashboard")}
//               >
//                 📊 Dashboard
//               </button>

//               <button
//                 className={`sidebar-btn ${active === "browse" ? "active" : ""}`}
//                 onClick={() => setActive("browse")}
//               >
//                 🔎 Browse Jobs
//               </button>

//               <button
//                 className={`sidebar-btn ${active === "applications" ? "active" : ""}`}
//                 onClick={() => setActive("applications")}
//               >
//                 📄 My Applications
//               </button>

//               <button
//                 className={`sidebar-btn ${active === "saved" ? "active" : ""}`}
//                 onClick={() => setActive("saved")}
//               >
//                 ❤️ Saved Jobs
//               </button>

//               <button
//                 className={`sidebar-btn ${active === "recommended" ? "active" : ""}`}
//                 onClick={() => setActive("recommended")}
//               >
//                 ⭐ Recommended Jobs
//               </button>

//               <button
//                 className={`sidebar-btn ${active === "profile" ? "active" : ""}`}
//                 onClick={() => setActive("profile")}
//               >
//                 👤 Profile
//               </button>

//             </div>

//             <button className="logout-btn-modern" onClick={handleLogout}>
//               🚪 Logout
//             </button>

//           </div>

//           {/* ⭐ MAIN CONTENT AREA */}
//           <div className="col-md-9 col-lg-10 dashboard-content-modern">

//             <div className="dashboard-header">
//               <h3 className="dashboard-page-title">
//                 {active === "dashboard" }
//                 {active === "browse" }
//                 {active === "applications"}
//                 {active === "profile" }
//                 {active === "saved"}
//                 {active === "recommended"}
//               </h3>
//             </div>
//             <br></br>
//             <br></br>

//             <div className="dashboard-card-area">
//               {renderContent()}
//             </div>

//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default UserDashboard;



import { useState } from "react";
import "./UserDashboard.css";
import DashboardHome from "./DashboardHome";
import BrowseJobs from "./BrowseJobs";
import MyApplications from "./MyApplications";
import Profile from "./Profile";
import SavedJobs from "./SavedJobs";
import RecommendedJobs from "./RecommendedJobs";
import UserNavbar from "../../components/UserNavbar";

function UserDashboard() {
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <DashboardHome />;
      case "browse":
        return <BrowseJobs />;
      case "applications":
        return <MyApplications />;
      case "profile":
        return <Profile />;
      case "saved":
        return <SavedJobs />;
      case "recommended":
        return <RecommendedJobs />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      <UserNavbar setActive={setActive} />

      <div className="user-dashboard-modern">

        {/* ⭐ FIXED SIDEBAR */}
        <div className="sidebar-modern">

          <div className="sidebar-logo">
            <h4>☰ MENU</h4>
          </div>

          <div className="sidebar-menu">

            <button
              className={`sidebar-btn ${active === "dashboard" ? "active" : ""}`}
              onClick={() => setActive("dashboard")}
            >
              📊 Dashboard
            </button>

            <button
              className={`sidebar-btn ${active === "browse" ? "active" : ""}`}
              onClick={() => setActive("browse")}
            >
              🔎 Browse Jobs
            </button>

            <button
              className={`sidebar-btn ${active === "applications" ? "active" : ""}`}
              onClick={() => setActive("applications")}
            >
              📄 My Applications
            </button>

            <button
              className={`sidebar-btn ${active === "saved" ? "active" : ""}`}
              onClick={() => setActive("saved")}
            >
              ❤️ Saved Jobs
            </button>

            <button
              className={`sidebar-btn ${active === "recommended" ? "active" : ""}`}
              onClick={() => setActive("recommended")}
            >
              ⭐ Recommended Jobs
            </button>

            <button
              className={`sidebar-btn ${active === "profile" ? "active" : ""}`}
              onClick={() => setActive("profile")}
            >
              👤 Profile
            </button>

          </div>

          <button className="logout-btn-modern" onClick={handleLogout}>
             Logout
          </button>

        </div>

        {/* ⭐ SCROLLABLE CONTENT ONLY */}
        <div className="dashboard-content-modern">

          <div className="dashboard-header">
            <h3 className="dashboard-page-title">
              {active.toUpperCase()}
            </h3>
          </div>

          <div className="dashboard-card-area">
            {renderContent()}
          </div>

        </div>

      </div>
    </>
  );
}

export default UserDashboard;
