/* 
请求搜索结果需要的参数类型
*/
export interface ISearchResultParams {
  page: number
  pre_page: number
  q: string
}

/* export interface ISearchResult {
  art_id: number
  aut_id: number
  aut_name: string
  ch_id: number
  collect_count: number
  comm_count: number
  cover: { type: number; images: string[] } //{type: 0, images: Array(0)}
  is_top: number
  like_count: number
  pubdate: string
  title: string
} */
