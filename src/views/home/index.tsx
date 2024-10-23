/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';
import { LogoutIcon, DiscordIcon, UserProfile, DocsIcon } from 'images/icons';
import styles from './container.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AuthenticationController from 'auth';

const Container = () => {
  const isAuthenticated = AuthenticationController.isLoggedIn();
  useOnAuthRedirect();

  // TODO:
  // 1. Preload the background image

  return (
    <div className={styles.hero}>
      <div className={styles.navbar}>
        <a
          href={process.env.REACT_APP_XR_COMMUNITY_URL}
          className={styles.link}
          title="Removed"
        >
          <DiscordIcon />
        </a>
        <a
          href={process.env.REACT_APP_DOCS_URL}
          className={styles.link}
          title="Removed"
        >
          <DocsIcon />
        </a>
        <span title={`Log ${isAuthenticated ? 'out' : 'in'} button`}>
          {!isAuthenticated ? (
            <UserProfile
              onClick={() => {
                void AuthenticationController.doLogin();
              }}
            />
          ) : (
            <LogoutIcon onClick={AuthenticationController.doLogout} />
          )}
        </span>
      </div>
    </div>
  );
};

export default Container;

function useOnAuthRedirect() {
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isAuthenticated = AuthenticationController.isLoggedIn();
  const reactRouterRedirectUrl = locationState?.from?.pathname as
    | string
    | undefined;

  useEffect(() => {
    if (!isAuthenticated && reactRouterRedirectUrl) {
      setSearchParams({ redirectUrl: reactRouterRedirectUrl });
    } else if (isAuthenticated && searchParams.has('redirectUrl')) {
      const redirectUrl = searchParams.get('redirectUrl') as string;
      navigate(redirectUrl);
    }
  }, [isAuthenticated]);
}
