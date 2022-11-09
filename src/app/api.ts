import axios from "axios";
import { get } from "lodash";

axios.defaults.baseURL = "https://mdsa.bipad.gov.np/api/v1";

export class Api {
  async getAllOrganizations() {
    try {
      const response = await axios.get("/organization");
      console.log("GET ALL ORGANIZATIONS API RESPONSE", response);
      const data = get(response, "data");
      return data;
    } catch (error) {
      console.log("GET ALL ORGANIZATIONS API ERROR", error);
      throw error;
    }
  }
  async getAllProjects() {
    try {
      const response = await axios.get("/project");
      console.log("GET ALL PROJECTS API RESPONSE", response);
      const data = get(response, "data");
      return data;
    } catch (error) {
      console.log("GET ALL PROJECTS API ERROR", error);
      throw error;
    }
  }
}
