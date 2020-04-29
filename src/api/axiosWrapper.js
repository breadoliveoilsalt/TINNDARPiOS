import axios from 'axios'
import qs from 'qs'

export default axiosWrapper = {
  get: (url) => {
    return axios.get(url)
  },
  post: async (url, params) => {
    return axios({
      method: "post",
      url: url,
      data: params
    })
  },
  getWithParams: async (url, params) => {
    return axios({
      method: "get",
      url: url,
      params: params,
      paramsSerializer: function (params) {
        return qs.stringify(params)
      }
    })
  }
}
