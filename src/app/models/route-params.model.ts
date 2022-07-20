export interface IRouteParams {
  data?: any[];
  params?: any[];
}
export class RouteParams implements IRouteParams{
  data: any[];
  params: any[];

  constructor() {
    this.data = [];
    this.params = [];
  }

}
