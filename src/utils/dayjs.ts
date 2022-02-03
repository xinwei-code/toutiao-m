/* 
初始化dayjs相关配置
*/
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用中文语言包
import 'dayjs/locale/zh-cn'

//配置处理相对时间
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用



//转换成相对时间
export const toRelativeTime = (time: number | string) => {
  return dayjs(time).from(dayjs())
}

// console.log(dayjs('2022-01-30').from(dayjs()))
