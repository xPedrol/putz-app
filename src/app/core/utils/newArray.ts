export function newArray(array: any[]) {
  const newArray = [];
  array.forEach(item => {
    // Object.keys(item)?.forEach(key => {
    //   if (Array.isArray(item[key])) {
    //     item[key] = this.newArray(item[key]);
    //   }
    // });
    newArray.push(item);
  });
  return newArray;
}
