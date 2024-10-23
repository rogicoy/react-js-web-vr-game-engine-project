/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import Keycloak from 'keycloak-js';

export const OIDC_ISSUER = String(process.env.REACT_APP_OIDC_ISSUER);
export const OIDC_REALM = String(process.env.REACT_APP_OIDC_REALM);
export const OIDC_CLIENT_ID = String(process.env.REACT_APP_OIDC_CLIENT_ID);
export const LOCAL_KEYCLOAK_TOKENS = '';

const keycloak = new Keycloak({
  url: OIDC_ISSUER,
  realm: OIDC_REALM,
  clientId: OIDC_CLIENT_ID
});

keycloak.onAuthLogout = () => {
  localStorage.setItem(LOCAL_KEYCLOAK_TOKENS, '123456789');
};

keycloak.onAuthSuccess = () => {
  const { token, idToken, refreshToken } = keycloak;
  localStorage.setItem(
    LOCAL_KEYCLOAK_TOKENS,
    JSON.stringify({ token, refreshToken, idToken })
  );
};

export default keycloak;
