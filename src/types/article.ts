/* 
获取文章列表参数接口
*/
export interface IArticleParams {
  with_top: number
  timestamp: number
  channel_id: number
  /*   page: number,
  pre_page?:number */
}

// 首页每篇文章
export interface IArticle {
  art_id: number
  aut_id: number
  aut_name: string
  ch_id: number
  collect_count: number
  comm_count: number
  cover?: { type: number; images: string[] } //{type: 0, images: Array(0)}
  is_top: number
  like_count: number
  pubdate: string //'2022-01-30T18:21:39'
  title: string //'hello2222'
}

//文章详情
export interface IDetailArticle {
  art_id: number
  attitude: number
  aut_id: number
  aut_name: string
  aut_photo: string
  ch_id: number
  content: string
  is_collected: boolean
  is_followed: boolean
  pubdate: string
  recomments: []
  title: string
}

//文章的批评(请求参数)
export interface IComment {
  type: string,  // 评论类型， a --> 对文章的评论 ， c --> 对评论的回复
  source: number | string | object,  //源id，文章id或者评论id
  offset: number | null,
  limit:number
}
