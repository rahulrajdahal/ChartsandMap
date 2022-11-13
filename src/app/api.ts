import axios from "axios";
import { get } from "lodash";

// axios base url
axios.defaults.baseURL = "https://mdsa.bipad.gov.np/api/v1";

// export the api calls
export class Api {
  /**
   * @destription Get all the organizations from the API
   * @returns AxiosResponse
   */
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

  /**
   * @destription Get all the projects from the API
   * @returns AxiosResponse
   */
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
