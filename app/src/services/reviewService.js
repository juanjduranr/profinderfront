import http from "./httpService";

const apiUrl = "http://localhost:65190/";

function apiEndpoint(companyId) {
  return `api/companies/${companyId}/reviews`;
}

export function getReviewsByCompany(companyId) {
  return http.get(apiUrl + apiEndpoint(companyId));
}
