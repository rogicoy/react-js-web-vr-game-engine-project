/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable import/no-anonymous-default-export */
import { all } from 'redux-saga/effects';
import shipViewerSagas from 'store/ship/sagas';

/**
 * Generator function that creates all the saga effect descriptions.
 */
export default function* () {
  // Add your saga effect in the array.
  yield all([shipViewerSagas()]);
}
