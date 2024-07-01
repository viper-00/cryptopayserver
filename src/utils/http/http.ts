import { IS_DEVELOPMENT } from 'packages/constants';

export class Http {
  // static httpPath = IS_DEVELOPMENT ? 'https://127.0.0.1:8888/v1/api/' : 'https://api.crypto.com/v1/api/';
  static httpPath = IS_DEVELOPMENT ? "" : "";

  // test
  static test = this.httpPath + 'client/test';
}
