import { setCandidate } from "../Redux/Slices/CandidateSlice";
import { setEmployer } from "../Redux/Slices/EmployersSlice";
import { setJobs } from "../Redux/Slices/JobsSlice";
import axiosClient from "./axiosClient";
import { getCookie } from "./conditions";

async function getSanctumCsrf() {
  await axiosClient.get("/sanctum/csrf-cookie");
}
// Login And LogOut
async function register(data, type = "candidate") {
  return await axiosClient.post(`/${type}/register`, data, {
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    },
    withXSRFToken: true,
  });
}
async function login(data, type = "candidate") {
  return await axiosClient.post(`/${type}/login`, data, {
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    },
    withXSRFToken: true,
  });
}
async function logout(type = "candidate") {
  const token = localStorage?.getItem("ACCESS_TOKEN") || null;
  if (!token) return;
  await axiosClient.post(
    `/${type}/logout`,
    {},
    {
      headers: {
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      withXSRFToken: true,
    }
  );
  console.log(getCookie("XSRF-TOKEN"));
  localStorage.removeItem("ACCESS_TOKEN");
  try {
    console.log("Has Logout");
  } catch (err) {
    console.error("thre is a problem", err);
  }
}
// Jobs

async function postJob(data = {}) {
  return await axiosClient.post("/job/store", data, {
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    },
    withXSRFToken: true,
  });
}

// get data
async function getJobs(dispatch) {
  
  await axiosClient.get(
    "/job/get",
    {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      withXSRFToken: true,
    }
  ).then(res=>{
    if(res.status == 201){
      dispatch(setJobs(res.data.jobs))
    }
  })
}
async function getCandidate(dispatch) {
  const token = localStorage?.getItem("ACCESS_TOKEN");
  if (!token) return;
  await axiosClient.post(
    "/candidate/get",
    { token: token },
    {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      withXSRFToken: true,
    }
  ).then(res=>{
    if(res.status == 200){
      dispatch(setCandidate(res.data.candidate))
    }
  })
}
async function getEmployer(dispatch) {
  const token = localStorage?.getItem("ACCESS_TOKEN");
  if (!token) return;
  await axiosClient.post(
    "/employer/get",
    { token: token },
    {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      withXSRFToken: true,
    }
  ).then(res=>{
    if(res.status == 200){
      dispatch(setEmployer(res.data.employer))
    }
  })
}


export { getSanctumCsrf, register, login, logout, postJob,getJobs,getCandidate,getEmployer };
