import {commonEnvironmentProd} from '../../commonEnvironment.prod';

export const environment = {
  ...commonEnvironmentProd,
  production: true,
  PORT: 8101,
  BASE_APP_URL: commonEnvironmentProd.MAIN_APP_URL
};
