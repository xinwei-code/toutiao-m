/* 
postcss配置文件
*/

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //转换的根元素基准值
      //Vant组件库是基于逻辑像素 375 宽写的
      //正常情况下是设计稿的宽度  375宽 --> 37.5  750 --> 75
      rootValue: 37.5,
      //需要转换的css属性， * 表示所有属性
      propList: ['*'],
    },
  },
}
