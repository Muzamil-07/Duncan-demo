export function toCamelCase (str) {
  return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase())
}

export const angleToRadians = angle => {
  return angle * (Math.PI / 180)
}

export function subtractVh (vhString, num) {
  // Extract the numeric part from the vhString
  const vhValue = parseFloat(vhString)

  // Subtract the number from the numeric part
  const resultValue = vhValue - num

  // Return the result as a string with 'vh' unit
  return `${resultValue}vh`
}

export function divideVh (vhString, num) {
  // Extract the numeric part from the vhString
  const vhValue = parseFloat(vhString)

  // Subtract the number from the numeric part
  const resultValue = vhValue / num

  // Return the result as a string with 'vh' unit
  return `${resultValue}vh`
}
