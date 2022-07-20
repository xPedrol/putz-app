export function deleteField(object: any, key: string): any {
  if (object) {
    if (object[key]) {
      delete object[key];
    }
    if (typeof object[key] === "undefined" || typeof object[key] === null || object[key] === null) {
      delete object[key];
    }
  }
  return object;
}

export function deleteAllUndefinedFields(object: any): any {
  if (object) {
    Object.keys(object).forEach(key => {
      if (typeof object[key] === "undefined" || typeof object[key] === null || object[key] === null) {
        delete object[key];
      }
    });
  }
  return object;
}
