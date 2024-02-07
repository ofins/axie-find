import { AXIE_FIND_SERVER } from "@/settings/index";

export default class Http {
  static handleJSONResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async get(endpoint: string) {
    try {
      const response = await fetch(`${AXIE_FIND_SERVER}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return this.handleJSONResponse(response);
    } catch (error) {
      console.error(`Error in GET request`, error);
    }
  }

  static async post(endpoint: string, params: unknown) {
    try {
      const response = await fetch(`${AXIE_FIND_SERVER}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return this.handleJSONResponse(response);
    } catch (error) {
      console.error(`Error in POST request`, error);
    }
  }
}
