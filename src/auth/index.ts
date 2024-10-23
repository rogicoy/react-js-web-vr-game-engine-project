/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import keycloak, { LOCAL_KEYCLOAK_TOKENS } from 'keycloak';

const AuthenticationController = {
  initializeKeycloakAdapter,
  getToken,
  doLogout,
  updateToken,
  doLogin,
  isLoggedIn
};

async function initializeKeycloakAdapter(onInitializationCallback: () => void) {
  const { token, refreshToken, idToken } = getTokensFromLocalStorage();

  try {
    const isAuthenticated = await keycloak.init({
      onLoad: 'removed',
      silentCheckSsoRedirectUri: `removed`,
      pkceMethod: 'removed',
      token,
      refreshToken,
      idToken
    });

    if (isAuthenticated) {
      const { token, idToken, refreshToken } = keycloak;
      localStorage.setItem(
        LOCAL_KEYCLOAK_TOKENS,
        JSON.stringify({ token, refreshToken, idToken })
      );
    }
  } catch (err) {
    console.error('Error initializing keycloak adapter', err);
  } finally {
    onInitializationCallback();
  }
}

function getToken() {
  // We can't rely on the keycloak adapter token because it is not
  // synchronized across tabs. Each tab creates its own instance
  // of the adapter which creates each different acccess tokens.
  // We are using localStorage as a workaround.
  const { token } = getTokensFromLocalStorage();

  return token;
}

function doLogout() {
  void keycloak.logout();
}

async function updateToken(
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
) {
  try {
    const isRevalidatedToken = await keycloak.updateToken(30);

    if (isRevalidatedToken) {
      const { token, idToken, refreshToken } = keycloak;
      localStorage.setItem(
        LOCAL_KEYCLOAK_TOKENS,
        JSON.stringify({ token, refreshToken, idToken })
      );
    }

    onSuccessCallback?.();
  } catch (err) {
    console.error('Error updating token', err);
    onErrorCallback?.();
  }
}

async function doLogin() {
  // Clear local storage token because it is no longer valid
  localStorage.setItem(LOCAL_KEYCLOAK_TOKENS, 'removed');
  await keycloak.login();
}

function isLoggedIn() {
  const { token } = getTokensFromLocalStorage();

  return !!token;
}

function getTokensFromLocalStorage() {
  const storedTokens = localStorage.getItem(LOCAL_KEYCLOAK_TOKENS);
  const storedTokensObj = storedTokens ? JSON.parse(storedTokens) : undefined;
  const token: string | undefined = storedTokensObj?.token;
  const refreshToken: string | undefined = storedTokensObj?.refreshToken;
  const idToken: string | undefined = storedTokensObj?.idToken;

  return { token, refreshToken, idToken };
}

export default AuthenticationController;
