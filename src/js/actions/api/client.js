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
    url = this.__endpoint(url);
    options.credentials = 'include';
    return (dispatch) => {
      dispatch({type:'API_START'});
      return new Promise((resolve, reject) => {
        fetch(url, options).then(res => {
          const decoder = new TextDecoder();

          // FIXME: https://stackoverflow.com/questions/19876002/percentage-progress-of-an-ajax-request-with-transfer-encoding-chunked
          const total = 500;

          let reader = res.body.getReader();
          let chunk = '';

          const progress = (result) => {
            if (result.done) {
              (res.status >= 400) ? reject(JSON.parse(chunk)) : resolve(JSON.parse(chunk));
              return this.__api_end(dispatch);
            }
            chunk += decoder.decode(result.value, {stream:true});
            dispatch({type: 'API_PROGRESS', data:{received:chunk.length, total}});
            return reader.read().then(progress);
          };
          reader.read().then(progress);

        }).catch(err => {
          reject(err);
          return this.__api_end(dispatch);
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

  __api_end(dispatch) {
    dispatch({type:'API_COMPLETED'});
    setTimeout(() => {
      dispatch({type:'API_END'});
    }, 400);
  }
}
