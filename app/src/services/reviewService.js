import http from "./httpService";
import { apiUrl } from "../config.json";

function apiEndpoint(companyId) {
  return `api/companies/${companyId}/reviews`;
}

export function getReviewsByCompany(companyId) {
  return http.get(apiUrl + apiEndpoint(companyId));
}
