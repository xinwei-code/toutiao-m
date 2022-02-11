import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/post',
    method: 'post',
    timeout: 1000,
    response: {
      code: 200,
      data: {
        'name|10': 'vben',
        image: '@image(200x100)',
        url: '@url(http)',
        page: '@csentence(50)',
        time:'@date(yyyy-MM-dd)'
      },
    },
  },
] as MockMethod[]
