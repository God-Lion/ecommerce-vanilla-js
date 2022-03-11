export function trim (data, regex = null) {
  if (typeof (data) === 'string') {
    data = data.trim()
    if (regex !== null) {
      if (data.startsWith(regex)) data = data.substring(1, data.length)
      if (data.endsWith(regex)) data = data.substring(0, data.length - 1)
    }
  }
  return data
}

export function empty (data) {
  try {
    if (typeof (data) === 'number' || typeof (data) === 'boolean') return false
    if (data == undefined) return true
    if (data == null) return true
    if (data == '') return true
    if (is_array(data)) { return (data.length < 1) }
  } catch (error) {}
  return false
}

export function ucfirst (str) { return `${str.charAt(0).toUpperCase()}${str.substring(1, str.length)}` }

export function is_array (data) {
  if (typeof (data) === 'object' && typeof (data.length) === 'number') return true
  return false
}

export function in_array (key, array) {
  let find = false
  array.forEach(element => { if (key == element) { find = true } })
  return find
}

export function array_keys (array) {
  const keys = new Array()
  for (const key in array) if (array.hasOwnProperty(key)) keys.push(key)
  return keys
}

export function array_diff (array1, array2) {
  const array = new Array()
  array1.forEach(e1 => { if (!in_array(e1, array2)) array.push(e1) })
  return array
}

export function isset (data) {
  // try {

  if (typeof data === 'object') {
    if (!is_array(data)) {
      // console.log(data)
      data = Object.getOwnPropertyNames(data)
      // console.log(data.length > 0 )
      return (data.length > 0)
      //     console.log(!empty(Object.getOwnPropertyNames(data)))
      // console.log('-----');
      // return !empty(Object.getOwnPropertyNames(data))
    }
  } else {
    if (typeof data === 'string') { if (!empty(data)) { return true } }
    if (typeof data === 'undefined') { return false }
  }

  // } catch (error) { return false }
  // if ( typeof(data) == 'undefined' ) return false
  return false
}

export function get_class_methods (controller) { return Object.getOwnPropertyNames(controller.__proto__).filter(prop => prop != 'constructor') }

export function call_user_func_array (array, param) {
  if (is_array(array)) {
    const func = array[0][array[1]]
    func.apply(param)
  }
}

// export function empty ( data ) {
//   if(typeof(data) == 'number' || typeof(data) == 'boolean') return false
//   if( typeof( data ) == 'undefined' || data === null ) return true
//   if(typeof(data.length) != 'undefined') return data.length == 0
//   let count = 0
//   for( var i in data)  if( data.hasOwnProperty(i) ) count ++
//   return count == 0
// }

// export function isset ( data ) {
//     console.log( data )
// }
