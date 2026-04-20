// import { BrowserRouter } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
// import AppRoutes from "../src/pages/routes/AppRoutes.jsx";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./pages/routes/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
