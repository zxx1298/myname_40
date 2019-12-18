import axios from '@/utils/myaxios.js'
// 登录方法
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
export const getuserInfo = (id) => {
  return axios({
    url: `/user/${id}`
  })
}
export const userEdit = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 关注用户
export const userFollows = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
// 取消关注用户
export const userUnfollow = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 用户关注列表
export const getMyfollow = () => {
  return axios({
    url: '/user_follows'
  })
}
// 用户收藏列表
export const getCollect = () => {
  return axios({
    url: '/user_star'
  })
}
