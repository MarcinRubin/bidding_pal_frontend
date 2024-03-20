import axios from "axios";

export default async function fetchData(url) {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.withCredentials = true;

  const client = axios.create({
    baseURL: "http://localhost:8000",
    // baseURL: "http://biddingpal-dev.eu-central-1.elasticbeanstalk.com/",
  });

  const response = await client.get(url);
  const data = await response.data;

  return data;
}
