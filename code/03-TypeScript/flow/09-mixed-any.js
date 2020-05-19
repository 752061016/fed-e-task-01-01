/**
 * Mixed Any
 *
 * @flow
 */

// Mixed类型表示可以为任何类型的值，强类型，可以编写类型判断添加
function passMixed (value: mixed) {
  if (typeof value === 'string') {
    value.substr(1)
  }

  if (typeof value === 'number') {
    value * value
  }
}

passMixed('string') // 不会报错

passMixed(100) // 不会报错

// Any类型表示可以为任何类型的值，弱类型，兼容老代码

function passAny (value: any) {
  value.substr(1)

  value * value
}

passAny('string')

passAny(100)