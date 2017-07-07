/* eslint no-console:0 */
export default class APIClient {
  constructor(version = 'v0', url = process.env.API_URL) {
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

  // -- @private --
  __fetch(url, options = {}) {
    url = this.__endpoint(url);
    options.credentials = 'include';
    return (dispatch) => {
      dispatch({type:'API_START'});
      return new Promise((resolve, reject) => {
        fetch(url, options).then(res => {
          dispatch({type:'API_END'});
          if (res.status >= 400) return res.json().then(reject);
          res.json().then(resolve);
        }).catch(err => {
          reject(err);
          dispatch({type:'API_END'});
        });
      });
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

}
