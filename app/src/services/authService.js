import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "token";
const tokenKey = "token";
const bearerKey = "bearer";
const dateKey = "date";
const tokenExpiredException = "tokenExpiredException";

export async function login(username, password) {
  const { data } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, data.accessToken);
  localStorage.setItem(dateKey, new Date());
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const { sub: id, preferred_username: name } = jwtDecode(jwt);
    return { id, name };
  } catch (ex) {
    return null;
  }
}

function validateToken() {
  const currentDate = new Date();
  const pastDate = new Date(localStorage.getItem(dateKey));
  return Math.abs(currentDate - pastDate) / 36e5 < 1;
}

export function getAuthHeader() {
  if (!validateToken()) throw new Error(tokenExpiredException);
  return {
    headers: { Authorization: `${bearerKey} ${localStorage.getItem(tokenKey)}` }
  };
}

export function getJwt() {
  if (!validateToken()) throw new Error(tokenExpiredException);
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  getAuthHeader
};
