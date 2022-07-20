export interface IAppConfig {
  appId: number;
  baseAppURL: string;
  isMainApp?: boolean;
}

export class AppConfig implements IAppConfig {
  appId: number;
  baseAppURL: string;
  isMainApp: boolean;

  constructor(appConfig: any = {}) {
    this.appId = appConfig.appId;
    this.baseAppURL = appConfig.baseAppURL;
    this.isMainApp = this.checkMainApp();
  }

  checkMainApp(): boolean {
    return this.appId === 0;
  }
}
