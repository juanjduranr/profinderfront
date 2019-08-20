import http from "./httpService";
import { apiUrl } from "../config.json";

function apiEndpoint(companyId) {
  return `api/companies/${companyId}/reviews`;
}

export function getReviewsByCompany(companyId) {
  return http.get(apiUrl + apiEndpoint(companyId));
}

export function addReview(review, config) {
  return http.post(apiUrl + apiEndpoint(review.companyId), review, config);
}

export function deleteReview(companyId, reviewId, config) {
  return http.delete(apiUrl + apiEndpoint(companyId) + "/" + reviewId, config);
}

export default {
  getReviewsByCompany,
  addReview,
  deleteReview
};
