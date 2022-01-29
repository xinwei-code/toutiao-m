import request from '../utils/request'
import { ILoginInfo } from '../types/loginInfo'

/* 
用户登录
*/
export const login = (data: ILoginInfo) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data,
  })
}

/* 
发送短信验证码
*/
export const sendSms = (mobile: string) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}
