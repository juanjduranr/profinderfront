import http from "./httpService";

const apiUrl = "http://localhost:65190/";
const apiEndpoint = "api/companies";

export function getCompanies() {
  return http.get(apiUrl + apiEndpoint);
}

export function getCompany(id) {
  return http.get(apiUrl + apiEndpoint + "/" + id);
}
