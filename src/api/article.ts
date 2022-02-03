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
