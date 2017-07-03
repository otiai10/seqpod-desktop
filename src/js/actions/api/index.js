/* eslint no-console:0 */
import APIClient from './client';
const client = new APIClient();

export function statusAPI() {
  return (dispatch) => {
    return dispatch(client.status());
  };
}
