import axios from '@/utils/myaxios.js'
// 文章列表
export const articleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 文章详情
export const articleUser = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 点赞文章
export const articleLick = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 收藏文章
export const userStar = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
