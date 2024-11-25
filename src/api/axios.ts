import axios from 'axios';
import { USER_API_URL } from '../functions/environmentVariables';
import { getTokenDetails, storeTokenDetails } from '../functions/userSession';
import { store } from '../store';
import { updateToken } from '../store/slices/user';

const sessionToken = getTokenDetails();

export const appAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: USER_API_URL,
});

appAxios.interceptors.request.use(
  (config) => {
    const appState = store.getState();
    const storeToken = appState?.user.token;
    // get state is called here to be current at the time of rendering

    const token = storeToken?.access_token || sessionToken?.access_token;

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      // urls to avoid (don't logout when they fail)
      originalConfig.url !== `${USER_API_URL}/auth/login` && //login
      err.response
    ) {
      if (
        err.response.status === 401 &&
        sessionToken && // refresh token only when a user has session
        !originalConfig._retry &&
        originalConfig.url !== `${USER_API_URL}/auth/refresh`
      ) {
        originalConfig._retry = true;

        try {
          const appState = store.getState();
          const storeToken = appState?.user.token;
          // get state is called here to be current at the time of rendering

          const refreshToken = storeToken?.refresh_token || sessionToken.refresh_token;
          const getNewAccessTokenResponse = await axios.post(
            `${USER_API_URL}/auth/refresh`,
            {
              token: refreshToken,
            }
            // {
            //   headers: {
            //     Authorization: 'Bearer ' + token,
            //   },
            // }
          );
          const newAccessToken = getNewAccessTokenResponse.data.data.access_token;

          storeTokenDetails({
            access_token: newAccessToken,
            refresh_token: refreshToken,
          });

          store.dispatch(
            updateToken({
              token: {
                access_token: newAccessToken,
                refresh_token: refreshToken,
              },
            })
          );

          return appAxios(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  }
);
