import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/get',
    method: 'get',
    timeout: 1000,
    response: {
      code: 200,
      data: {
        'name|10': 'vben2222',
      },
    },
  },
] as MockMethod[]
