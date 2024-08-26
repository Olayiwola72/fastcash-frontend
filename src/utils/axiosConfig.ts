import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { store } from '../redux/store';
import { signInFailure } from '../redux/user/user.actions';
import { handleFallbackError } from './error';
import i18n from './i18n';
import { ErrorDetails } from '../redux/user/interface';
import { API_ERROR_MESSAGES } from '../constants/api';
import { API_PASSWORD, API_USERNAME, BASE_URL } from '../constants/env';
import { Buffer } from 'buffer';

// Function to create an Axios instance with common configuration
const createAxiosInstance = (useAuth: boolean = false): AxiosInstance => {
  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (useAuth) {
    const username = API_USERNAME;
    const password = API_PASSWORD;
    if (username && password) {
      headers['Authorization'] = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    } else {
      console.warn('API username or password is missing.');
    }
  }

  return axios.create({
    baseURL: BASE_URL,
    headers,
  });
};

// Create a new instance of Axios without interceptors
export const axiosNoInterceptor : AxiosInstance = createAxiosInstance();

// Create an instance of Axios with basic authentication
export const axiosInstanceWithAuthNoInterceptor: AxiosInstance = createAxiosInstance(true);

// Create an instance of Axios
export const axiosInstance: AxiosInstance = createAxiosInstance();

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => { // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error.response) {
      const apiErrorResponse = error.response.data as ErrorDetails;
      const errorMessage = apiErrorResponse.errors[0]?.errorMessage;

      if (error.response && error.response.status === 401 && errorMessage !== API_ERROR_MESSAGES.TOKEN_EXPIRED) {  // Handle all unauthorized cases except token expiration
        store.dispatch(
          signInFailure(handleFallbackError(i18n.t("AuthenticationErrorOccured")))
        );
      }
    }else{
      // Handle network errors
      console.error('Network error occurred:', error.message);
    }         

    return Promise.reject(error);
  }
);