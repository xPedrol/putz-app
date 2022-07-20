import {commonEnvironmentProd} from '../../../../commonEnvironment.prod';

export const environment = {
  ...commonEnvironmentProd,
  production: true,
  PORT: 8102,
  BASE_APP_URL: commonEnvironmentProd.PAGES_APP_URL
};
