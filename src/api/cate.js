import axios from '@/utils/myaxios.js'

export const userCate = () => {
  return axios({
    url: '/category'
  })
}
