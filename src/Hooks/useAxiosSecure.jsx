import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthContext";

const apiURL = import.meta.env.VITE_API_URL;
const axiosSecure = axios.create({
  baseURL: apiURL?.endsWith('/') ? apiURL.slice(0, -1) : apiURL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
          // console.log('Token attached to request:', config.url);
        } else {
          console.warn('No token found in localStorage for request:', config.url);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response?.status;
        console.log('Interception triggered for:', status, '| URL:', error.config?.url);
        
        if (status === 401 || status === 403) {
          await signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
