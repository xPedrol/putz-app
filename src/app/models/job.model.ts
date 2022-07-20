export default interface IJob {
  uid: string;
  type: string;
  state: string;
  output: string;
  priority: number;
  template: {
    src: string;
    composition: string;
    outputExt: string;
  };
  assets: [];
  actions: {
    postrender: [
      {
        module: string;
        preset: string;
        output: string;
        params: {
          '-vcodec': string;
          '-r': number;
        };
      }
    ];
  };
  creator: string;
  updatedAt: string;
  createdAt: string;
}

export class Job implements IJob {
  actions: { postrender: [{ module: string; preset: string; output: string; params: { '-vcodec': string; '-r': number } }] };
  assets: [];
  createdAt: string;
  creator: string;
  output: string;
  priority: number;
  state: string;
  template: { src: string; composition: string; outputExt: string };
  type: string;
  uid: string;
  updatedAt: string;

  constructor(job: any = null) {
    job = job ?? {};
    this.actions = job.actions;
    this.assets = job.assets;
    this.createdAt = job.createdAt;
    this.creator = job.creator;
    this.output = job.output;
    this.priority = job.priority;
    this.state = job.state;
    this.template = job.template;
    this.type = job.type;
    this.uid = job.uid;
    this.updatedAt = job.updatedAt;
  }

}
