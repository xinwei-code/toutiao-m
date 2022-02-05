/* 
文章请求相关模块
*/
import request from '../utils/request'

import { IArticleParams } from '../types/article'

//获取文章列表
export const getArticles = (params: IArticleParams) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params,
  })
}

//获取文章详情
export const getArticleById = (articleId: string) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`,
  })
}

//收藏文章
export const addCollect = (articleId: string) => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: {
      target: articleId,
    },
  })
}

//取消收藏
export const deleteCollect = (articleId: string) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`,
  })
}

//添加点赞
export const addLike = (articleId: string) => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: {
      target: articleId,
    },
  })
}

//取消点赞
export const deleteLike = (articleId: string) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`,
  })
}
