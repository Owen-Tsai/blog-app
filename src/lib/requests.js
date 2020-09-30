import axios from 'axios'

const DEBUG = true
const enableLanNetwork = false
const lanIP = 'http://192.168.137.173'

/**
 * Setup interceptors globally
 */
export function globalSetup() {
  const token = window.localStorage.getItem('oc_token')
  if(token) {
    axios.defaults.headers.common['Authorization'] = token
  }

  axios.interceptors.response.use(response => {
    if(response.status && response.status === 200 && response.data.status === 'error') {
      // Custom error returned by server
      return
    }
    return Promise.resolve(response)
  }, error => {
    return Promise.reject(error.response)
  })
}

export class requests {
  static baseURL = DEBUG ?
    (enableLanNetwork ? lanIP : 'http://127.0.0.1:8000') : 's'

  static get(url, success = () => {}, fail = () => {}) {
    return axios({
      method: 'get',
      url: `${this.baseURL}${url}`
    }).then(success).catch(fail)
  }

  static post(url, data, success = () => {}, fail = () => {}) {
    return axios({
      method: 'post',
      url: `${this.baseURL}${url}`,
      data: data,
    }).then(success).catch(fail)
  }

  static put(url, data, success = () => {}, fail = () => {}) {
    return axios({
      method: 'put',
      url: `${this.baseURL}${url}`,
      data: data,
    }).then(success).catch(fail)
  }

  static patch(url, data, success = () => {}, fail = () => {}) {
    return axios({
      method: 'patch',
      url: `${this.baseURL}${url}`,
      data: data,
    }).then(success).catch(fail)
  }

  static delete(url, success = () => {}, fail = () => {}) {
    return axios({
      method: 'delete',
      url: `${this.baseURL}${url}`,
    }).then(success).catch(fail)
  }
}
