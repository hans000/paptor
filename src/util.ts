/**
 * 判断数据类型
 * @param data 数据
 */
export const isType = (data: any) => Object.prototype.toString.call(data).toLowerCase().slice(8, -1)