// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://job-portal-backend-asg7.onrender.com/api",
// });

// // attach token automatically (later use)
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-backend-asg7.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
