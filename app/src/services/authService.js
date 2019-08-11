import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "token";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data } = await http.post(apiEndpoint, { username, password });
  console.log(data.accessToken);
  localStorage.setItem(tokenKey, data.accessToken);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt
};
