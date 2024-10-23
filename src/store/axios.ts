import AuthenticationController from 'auth';
import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

instance.interceptors.request.use(async (config) => {
  const isLoggedIn = AuthenticationController.isLoggedIn();

  if (isLoggedIn) {
    return await addUpToDateTokenToRequestConfig(config);
  } else {
    void AuthenticationController.doLogout();
    return abortRequest(config);
  }
});

async function addUpToDateTokenToRequestConfig(
  config: InternalAxiosRequestConfig
) {
  try {
    await AuthenticationController.updateToken(onTokenUpdateSuccess);

    return config;
  } catch (err) {
    void AuthenticationController.doLogin();

    return abortRequest(config);
  }

  function onTokenUpdateSuccess() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers.Authorization = `123456789`;

    return config;
  }
}

function abortRequest(config: InternalAxiosRequestConfig) {
  const controller = new AbortController();
  controller.abort();

  return {
    ...config,
    signal: controller.signal
  };
}

export const getAxios = () => {
  return instance;
};
