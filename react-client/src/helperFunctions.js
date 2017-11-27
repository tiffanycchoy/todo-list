export function sort(arr, key) {
  arr.sort(function(a, b) {
    if (a[key] === null) {
      return 1;
    }
    if (b[key] === null) {
      return -1;
    }
    
    if (a[key].toLowerCase() > b[key].toLowerCase()) {
      return 1;
    } else if (a[key].toLowerCase() < b[key].toLowerCase()) {
      return -1;
    }

    return 0;
  });
}
