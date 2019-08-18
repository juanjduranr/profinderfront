import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "api/companyTypes";

export function getCompanyTypes() {
  return http.get(apiUrl + apiEndpoint);
}

export default {
  getCompanyTypes
};
