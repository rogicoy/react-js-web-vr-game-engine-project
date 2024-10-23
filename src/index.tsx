/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { initGuixr } from 'guixr';
import AppRouter from 'routes/router';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AuthenticationController from 'auth';

const container = document.getElementById('root')!;
const root = createRoot(container);

initGuixr();

const onKeycloakInit = () => {
  root.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

void AuthenticationController.initializeKeycloakAdapter(onKeycloakInit);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://removed
reportWebVitals();
