
export function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
      result = '0' + result;
  return result;
}