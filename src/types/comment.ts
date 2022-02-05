/* 
评论接口
*/
export interface IComment {
  aut_id: number
  aut_name: string
  aut_photo: string
  com_id: number
  content: string
  is_liking: boolean
  is_top: number
  like_count: number
  pubdate: string
  reply_count: number
}

/* 
添加评论接口参数
*/

export interface IAddComment {
  target: string
  art_id: string
  content: string
}
