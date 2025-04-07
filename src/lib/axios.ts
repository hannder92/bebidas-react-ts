import axios from "axios";

const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1", // Base URL para todas las solicitudes
  timeout: 10000, // Tiempo de espera de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
