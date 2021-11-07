import axios from "axios";

class AxiosApi {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.openweathermap.org",
      params: {
        appid: process.env.REACT_APP_API_KEY,
        units: "metric",
      },
    });
  }

  async post(endpointName, params) {
    return this.api.post(endpointName, params);
  }

  async get(endpointName, params) {
    return this.api.get(endpointName, params);
  }
}

const API = new AxiosApi();

export default API;
