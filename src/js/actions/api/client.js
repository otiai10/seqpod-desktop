/* eslint no-console:0 */
export default class APIClient {
  constructor(url = process.env.API_URL, version = 'v0') {
    this.version = version;
    this.base = url.replace(/\/$/, '');
    this.fetch = fetch;
  }
  status() {
    return this.__get('status');
  }

  workspace() {
    return this.__post('jobs/workspace');
  }

  upload(job, fastq) {
    const data = new FormData();
    data.append('fastq', fastq);
    return this.__post(`jobs/${job._id}/fastq`, {
      body:   data,
    });
  }

  // API GET JOB by ID
  job(id) {
    return this.__get(`jobs/${id}`);
  }

  // API Mark Job as Ready
  jobReady(id) {
    return this.__post(`jobs/${id}/ready`);
  }

  // -- @private --
  __fetch(url, options = {}) {

    const id = Date.now() + Math.random();
    url = this.__endpoint(url);

    return (dispatch) => {

      let xhr = new XMLHttpRequest();
      const p = new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState != XMLHttpRequest.DONE) return;
          if (xhr.status >= 400) {
            this.__api_end(dispatch, id);
            return reject({status: xhr.status, message: xhr.statusText});
          }
          resolve(JSON.parse(xhr.responseText));
          return this.__api_end(dispatch, id);
        };
      });

      xhr.upload.onprogress = (ev) => {
        dispatch({type: 'API_PROGRESS', data:{id, loaded:ev.loaded, total: ev.total}});
      };

      xhr.open(options.method, url, true);
      xhr.withCredentials = true;
      (options.body) ? xhr.send(options.body) : xhr.send();
      dispatch({type:'API_START', data:{id}});

      return p;
    };
  }
  __get(url, options = {}) {
    options.method = 'GET';
    return this.__fetch(url, options);
  }
  __post(url, options = {}) {
    options.method = 'POST';
    return this.__fetch(url, options);
  }
  __endpoint(url) {
    return [this.base, this.version, url.replace(/^\//, '')].join('/');
  }

  __api_end(dispatch, id) {
    dispatch({type:'API_COMPLETED', data:{id}});
    setTimeout(() => {
      dispatch({type:'API_END', data:{id}});
    }, 400);
  }
}
