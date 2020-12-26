import { cloneDeep } from 'lodash';
import { config } from '../startup/config';

export function getTestConfig(fileName: string) {
  const testConfig = cloneDeep(config);
  testConfig.mongo.dbName = fileName.split('\\').slice(-1)[0].split('.').join('-');
  return testConfig;
}
