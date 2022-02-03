/* 
搜索相关请求模块
*/

import request from '../utils/request'
import { ISearchResultParams } from '../types/search'

//获取搜索联想建议
export const getSearchSuggestion = (q: string) => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q, //联想建议关键词
    },
  })
}

//获取搜索结果
export const getSearchResult = (params: ISearchResultParams) => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params,
  })
}

//获取搜索结果
export const getSearchHistories = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'GET',
  })
}
