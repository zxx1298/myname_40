import axios from '@/utils/myaxios.js'

export const uploderFile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
