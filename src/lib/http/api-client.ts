import axios from "axios"

const baseURL = "/api-proxy"

export const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15_000,
})


