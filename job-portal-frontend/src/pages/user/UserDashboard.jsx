
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




import { useState } from "react";
 import "./UserDashboard.css";
  import Navbar from "../../components/Navbar"; 
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
      window.location.href = "/login"; };
       
      const renderContent = () => { 
        switch (active) { 
          case "dashboard":  return <DashboardHome />; 
          case "browse": return <BrowseJobs />; 
          case "applications": return <MyApplications />; 
          case "profile": return <Profile />; 
          case "saved":return <SavedJobs />;
          case "recommended": return <RecommendedJobs />;
          default: return <DashboardHome />;
         } }; 
         
         return (
          
          <> 
         
          <div className="container-fluid user-dashboard"> 
            <div className="row"> 
               <UserNavbar />
              {/* SIDEBAR */} 
              
              <div className="col-md-3 col-lg-2 sidebar"> 
                
                <h4>Job Portal</h4> 
                <button onClick={() => setActive("dashboard")}>Dashboard</button> 
                <button onClick={() => setActive("browse")}>Browse Jobs</button> 
                <button onClick={() => setActive("applications")}>My Applications</button> 
                <button onClick={() => setActive("profile")}>Profile</button>
                <button onClick={() => setActive("saved")}> Saved Jobs</button>
                <button onClick={() => setActive("recommended")}> Recommended Jobs</button>
                
                 <button onClick={handleLogout} className="text-danger"> Logout </button> 
                 
                 </div> {/* MAIN CONTENT */}
                 
                  <div className="col-md-9 col-lg-10 dashboard-content"> 
                    {renderContent()} 
                   </div> 
                  
             </div> 
          </div> 
        </>
 ); 
    } 
                    
export default UserDashboard;