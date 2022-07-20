export interface IEnvironment {
  production: boolean;
  API_URL: string;
  API_KEY?: string;
  IMAGE_URL: string;
  VERSION?: number;
  APP_PORT?: number;
  project: IProject;
  DOMAIN?: string;
}

export interface IProject {
  id: number;
  name: string;
  DOMAIN?: string;
}
