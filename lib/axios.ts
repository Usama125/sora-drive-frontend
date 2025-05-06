import axios from "axios";
import { getAuth } from "firebase/auth";

// Only initialize Firebase on the client
const isClient = typeof window !== "undefined";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

// Attach token before each request
instance.interceptors.request.use(
  async (config) => {
    if (isClient) {
      const auth = getAuth(); // no need to pass `app` here again
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
