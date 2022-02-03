// 用户身份信息
export interface IUser {
  token: string
  refresh_token: string
}

/* 
首页用户频道列表
*/
export interface IChannel {
  id: number
  name: string
}

//用户登录信息
export interface ILoginInfo {
  mobile: string
  code: string
}

/* 
当前登录用户的信息
*/
export interface ICurrentUser {
  art_count: number
  fans_count: number
  follow_count: number
  like_count: number
  name: string
  photo: string
}
