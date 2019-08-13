import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "api/profiles";

export function getProfile(jwt) {
  var config = {
    headers: { Authorization: "bearer " + jwt }
  };
  return http.get(apiEndpoint, config);
}

export function updateProfile(jwt, profile) {
  var config = {
    headers: { Authorization: "bearer " + jwt }
  };
  return http.put(apiEndpoint + "/" + profile.externalId, profile, config);
}

export default {
  getProfile,
  updateProfile
};
