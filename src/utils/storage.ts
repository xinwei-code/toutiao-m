/* 
本地存储封装模块
*/
//读取
export const getItem = (name: string) => {
  const data = localStorage.getItem(name)
  return JSON.parse(data as string)
}

//存
export const setItem = (name: string, value: object) => {
  localStorage.setItem(name, JSON.stringify(value))
}

//删除
export const removeItem = (name: string) => {
  localStorage.removeItem(name)
}
