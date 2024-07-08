import { IS_DEVELOPMENT } from 'packages/constants';

export class Http {
  // static httpPath = IS_DEVELOPMENT ? 'https://127.0.0.1:8888/v1/api/' : 'https://api.crypto.com/v1/api/';
  static httpPath = IS_DEVELOPMENT ? 'http://127.0.0.1:8888/api' : 'http://127.0.0.1:8888/api';

  // test
  static test = this.httpPath + '/test';
  static test_db_conn = this.httpPath + '/test_db_conn';
  static find_user = this.httpPath + '/find_user';
  static create_user = this.httpPath + '/create_user';
}
