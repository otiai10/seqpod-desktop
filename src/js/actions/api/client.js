/* eslint no-console:0 */
export default class APIClient {
  constructor(version = 'v0', url = process.env.API_URL) {
    this.version = version;
    this.base = url.replace(/\/$/, '');
    this.fetch = fetch;
  }
  status() {
    return (dispatch) => {
      dispatch({type:'API_START'});
      return new Promise((resolve, reject) => {
        fetch(this.endpoint('status')).then(res => res.json()).then(json => {
          resolve(json);
          dispatch({type:'API_END'});
        }).catch(err => {
          reject(err);
          dispatch({type:'API_END'});
        });
      });
    };
  }
  endpoint(p) {
    return [this.base, this.version, p.replace(/^\//, '')].join('/');
  }
}
