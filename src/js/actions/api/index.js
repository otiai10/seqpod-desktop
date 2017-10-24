/* eslint no-console:0 */
import APIClient from './client';
const client = new APIClient();

export function api_status() {
  return (dispatch) => {
    return dispatch(client.status());
  };
}

export function api_workspace(workflow) {
  return client.workspace(workflow);
}

export function api_upload(job, file, name) {
  return client.upload(job, file, name);
}

export function api_get_job(id) {
  return client.job(id);
}

export function api_ready_job(id) {
  return client.jobReady(id);
}
