export function  getProjectIndexByField(field: string | number, fieldValue:string | number,array: any[] | null | undefined = []): number | null {
  let index = null;
  if (array) {
    if (array && array.length > 0) {
      array.forEach((project, i) => {
        if (project?.['field'] === fieldValue) {
          index = i;
        }
      });
    }
  }
  return index;
}
