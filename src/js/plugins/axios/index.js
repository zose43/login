import axios from "axios";
import interceptors from "./interceptors";

const instance = axios.create({
  baseURL: "https://mlp-demo.herokuapp.com/api/public",
  headers: { "Content-Type": "application/json" },
});

interceptors(instance);

export default instance;
