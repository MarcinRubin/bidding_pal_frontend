import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const client = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "http://biddingpal-dev.eu-central-1.elasticbeanstalk.com/",
});


