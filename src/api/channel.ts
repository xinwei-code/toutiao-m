/* 
频道相关请求模块
*/

import request from '../utils/request'

/* 
获取所有用户频道
*/
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}

/* 
添加用户频道
*/
export const addUserChannel = (data:object) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

/* 
删除用户频道
*/
export const deleteUserChannel = (channelId:number) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`,
  })
}
