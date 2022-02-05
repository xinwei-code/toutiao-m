/* 
评论相关请求模块
*/

import request from '../utils/request'
import { IComment } from '../types/article'
import { IAddComment } from '../types/comment'

/* 
获取文章评论数据
此接口的source参数不正确会返回400！！！
*/
export const getComments = (params: IComment) => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params,
  })
}

/* 
对评论或评论内容点赞
*/
export const addCommentLike = (commentId: string | number) => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId,
    },
  })
}

/* 
对评论或评论内容取消点赞
*/
export const deleteCommentLike = (commentId: string | number) => {
  return request({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE',
  })
}

/* 
添加评论或评论回复
*/
export const addComment = (data:IAddComment) => {
  return request({
    url: `/app/v1_0/comments`,
    method: 'POST',
    data,
  })
}
