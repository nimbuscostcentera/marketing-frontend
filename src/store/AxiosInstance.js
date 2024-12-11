import axios from "axios";

const URL = `${process.env.REACT_APP_BASEURL}`;

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: URL,
});

// Function to load the Access Token
function loadToken() {
  return new Promise((resolve, reject) => {
    const checkToken = () => {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        resolve(token);
      } else {
        // Retry after a short delay if the token is not found
        setTimeout(checkToken, 1000); // Adjust delay as needed
      }
    };
    checkToken();
  });
}

// Request Interceptor
AxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Load the Access Token
      const token = await loadToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      // Load the Refresh Token and add it to the request headers (if needed)
      const refreshToken = localStorage.getItem("RefreshToken");
      if (refreshToken) {
        config.headers["RefreshToken"] = refreshToken;
      }

      return config; // Return the modified config
    } catch (error) {
      console.error("Failed to set request headers:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("RefreshToken")
    ) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Create a temporary Axios instance for token refresh
        const AxiosRes = axios.create({
          baseURL: URL,
        });

        const refreshToken = localStorage.getItem("RefreshToken");
        // console.log(refreshToken);
        // Add the Refresh Token to the headers
        AxiosRes.defaults.headers["Authorization"] = `Bearer ${refreshToken}`;

        // Call the token refresh API
        const refreshResponse = await AxiosRes.post(
          `/auth-routes/token-generate`,
          {}
        );

        if (refreshResponse.status === 200) {
          // Extract the new Access Token
          const newAccessToken = refreshResponse.data?.response?.AccessToken;

          // Update localStorage with the new Access Token
          localStorage.setItem("AccessToken", newAccessToken);

          // Update the original request headers with the new Access Token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request with the updated headers
          return AxiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        if (refreshError.response?.status === 402) {
          // If Refresh Token is expired, log out the user
          localStorage.clear();
          window.location.reload();
        }
      }
    }

    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
