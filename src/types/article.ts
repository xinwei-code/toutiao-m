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

// 每篇文章
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
