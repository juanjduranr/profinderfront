import http from "./httpService";
import { apiUrl } from "../config.json";

function apiEndpoint(companyId) {
  return `api/companies/${companyId}/reviews`;
}

export function getReviewsByCompany(companyId) {
  return http.get(apiUrl + apiEndpoint(companyId));
}

export function addReview(review, config) {
  return http.post(apiUrl + "api/reviews", review, config);
}

export function deleteReview(id, config) {
  return http.delete(apiUrl + "api/reviews/" + id, config);
}

export default {
  getReviewsByCompany,
  addReview,
  deleteReview
};
