import { IS_DEVELOPMENT } from 'packages/constants';

export class Http {
  // static httpPath = IS_DEVELOPMENT ? 'https://127.0.0.1:8888/v1/api/' : 'https://api.crypto.com/v1/api/';
  static httpPath = IS_DEVELOPMENT ? 'http://127.0.0.1:8888/api' : 'http://127.0.0.1:8888/api';

  // test
  static test = this.httpPath + '/test';
  static test_db_conn = this.httpPath + '/test_db_conn';

  // user
  static find_user = this.httpPath + '/find_user';
  static create_user = this.httpPath + '/create_user';
  static login = this.httpPath + '/login';

  // store
  static find_store = this.httpPath + '/find_store'
  static find_store_by_id = this.httpPath + '/find_store_by_id'
  static create_store = this.httpPath + '/create_store'

  // notification
  static find_notification = this.httpPath + '/find_notification'
  static update_notification = this.httpPath + '/update_notification'
}
