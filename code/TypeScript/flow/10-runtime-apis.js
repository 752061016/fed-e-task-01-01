/**
 * 运行环境 API
 * 运行环境提供的API也有类型限制，如浏览器中的DOM和BOM，node中的Node API
 * @flow
 */

// 需要传入一个字符串，字符串会报错，返回一个HTMLElement类型或null
const element: HTMLElement | null = document.getElementById('app')