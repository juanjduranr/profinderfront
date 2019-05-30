import http from "./httpService";

const apiUrl = "http://localhost:65190/";
const apiEndpoint = "api/companyTypes";

export function getCompanyTypes() {
  return http.get(apiUrl + apiEndpoint);
}
