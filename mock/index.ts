import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/post',
    method: 'post',
    timeout: 1000,
    response: {
      code: 200,
      data: {
        name: 'vben',
      },
    },
  },
] as MockMethod[]
