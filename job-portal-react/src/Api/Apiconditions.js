import axiosClient from "./axiosClient";
import { getCookie } from "./conditions";

async function getSanctumCsrf() {
  await axiosClient.get("/sanctum/csrf-cookie");
}

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
  await axiosClient.post(`/${type}/logout`, {
    headers: {
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      Authorization: `Bearer ${token}`,
    },
    withXSRFToken: true,
  });
  console.log(getCookie("XSRF-TOKEN"));
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("who");
  try {
    console.log("Has Logout");
  } catch (err) {
    console.error("thre is a problem", err);
  }
}

export { getSanctumCsrf, register, login, logout };
