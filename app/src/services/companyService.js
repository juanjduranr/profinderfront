import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "api/companies";

export function getCompanies() {
  return http.get(apiUrl + apiEndpoint);
}

export function getCompany(id) {
  return http.get(apiUrl + apiEndpoint + "/" + id);
}

export default {
  getCompanies,
  getCompany
};
