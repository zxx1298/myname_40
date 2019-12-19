import axios from '@/utils/myaxios.js'
// 文章列表
export const articleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 文章id获取文章详情
export const articleUser = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 点赞文章和取消点赞
export const articleLick = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 收藏文章和取消文章
export const userStar = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 文章评论数据
export const userComment = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}
// 发布评论
export const postComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
