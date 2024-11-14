import { IS_DEVELOPMENT } from 'packages/constants';

export class Http {
  // static httpPath = IS_DEVELOPMENT ? 'https://127.0.0.1:8888/v1/api/' : 'https://api.crypto.com/v1/api/';
  static httpPath = IS_DEVELOPMENT ? 'http://127.0.0.1:8888/api' : 'http://127.0.0.1:8888/api';

  // test
  static test = this.httpPath + '/test';
  static test_db_conn = this.httpPath + '/test_db_conn';

  // user
  static find_user_by_email = this.httpPath + '/find_user_by_email';
  static update_user_by_email = this.httpPath + '/update_user_by_email';
  static update_user_password_by_email = this.httpPath + '/update_user_password_by_email';
  static delete_user_by_email = this.httpPath + '/delete_user_by_email';
  static create_user = this.httpPath + '/create_user';
  static login = this.httpPath + '/login';

  // apikeys
  static find_apikeys_setting = this.httpPath + '/find_apikeys_setting';
  static save_apikeys_setting = this.httpPath + '/save_apikeys_setting';
  static delete_apikeys_setting_by_id = this.httpPath + '/delete_apikeys_setting_by_id';

  // notification
  static find_notification_setting = this.httpPath + '/find_notification_setting';
  static update_notification_setting = this.httpPath + '/update_notification_setting';

  // store
  static find_store = this.httpPath + '/find_store';
  static find_store_by_id = this.httpPath + '/find_store_by_id';
  static create_store = this.httpPath + '/create_store';
  static update_store_by_id = this.httpPath + '/update_store_by_id';
  static archive_store_by_id = this.httpPath + '/archive_store_by_id';
  static delete_store_by_id = this.httpPath + '/delete_store_by_id';

  // checkout setting of store
  static find_store_checkout_setting_by_id = this.httpPath + '/find_store_checkout_setting_by_id';
  static update_store_checkout_setting_by_id = this.httpPath + '/update_store_checkout_setting_by_id';

  // webhook setting of store
  static find_store_webhook_setting = this.httpPath + '/find_store_webhook_setting';
  static find_store_webhook_setting_by_id = this.httpPath + '/find_store_webhook_setting_by_id';
  static update_store_webhook_setting_by_id = this.httpPath + '/update_store_webhook_setting_by_id';
  static save_store_webhook_setting = this.httpPath + '/save_store_webhook_setting';
  static delete_store_webhook_setting_by_id = this.httpPath + '/delete_store_webhook_setting_by_id';

  // payout setting of store
  static find_store_payout_setting_by_network = this.httpPath + '/find_store_payout_setting_by_network';
  static update_store_payout_setting_by_network = this.httpPath + '/update_store_payout_setting_by_network';

  // email setting of store
  static find_store_email_setting = this.httpPath + '/find_store_email_setting';
  static update_store_email_setting = this.httpPath + '/update_store_email_setting';
  static save_store_email_setting = this.httpPath + '/save_store_email_setting';

  // email rule setting of store
  static find_store_email_rule_setting = this.httpPath + '/find_store_email_rule_setting';
  static update_store_email_rule_setting = this.httpPath + '/update_store_email_rule_setting';
  static save_store_email_rule_setting = this.httpPath + '/save_store_email_rule_setting';

  // wallet
  static find_wallet = this.httpPath + '/find_wallet';
  static find_wallet_by_id = this.httpPath + '/find_wallet_by_id';
  static create_wallet = this.httpPath + '/create_wallet';
  static update_pwd_by_wallet_id = this.httpPath + '/update_pwd_by_wallet_id';
  static update_backup_by_wallet_id = this.httpPath + '/update_backup_by_wallet_id';
  static save_wallet = this.httpPath + '/save_wallet';
  static find_wallet_balance_by_network = this.httpPath + '/find_wallet_balance_by_network';

  // address of wallet
  static find_wallet_address_by_chain_and_network = this.httpPath + '/find_wallet_address_by_chain_and_network';
  static find_wallet_address_by_network = this.httpPath + '/find_wallet_address_by_network';
  static save_wallet_to_block_scan = this.httpPath + '/save_wallet_to_block_scan';

  // payment setting
  static find_payment_setting_by_chain_id = this.httpPath + '/find_payment_setting_by_chain_id';
  static update_payment_setting_by_id = this.httpPath + '/update_payment_setting_by_id';
  static find_payment_by_chain_id = this.httpPath + '/find_payment_by_chain_id';

  static checkout_chain_address = this.httpPath + '/checkout_chain_address';
  static find_fee_rate = this.httpPath + '/find_fee_rate';
  static send_transaction = this.httpPath + '/send_transaction';

  // ethereum
  static find_nonce = this.httpPath + '/find_nonce';
  static find_gas_limit = this.httpPath + '/find_gas_limit';
  static find_max_priorty_fee = this.httpPath + '/find_max_priorty_fee';

  // transaction
  static find_transaction_by_store_id = this.httpPath + '/find_transaction_by_store_id';

  // invoice
  static create_invoice = this.httpPath + '/create_invoice';
  static find_invoice = this.httpPath + '/find_invoice';
  static find_invoice_by_id = this.httpPath + '/find_invoice_by_id';
  static find_invoice_by_store_id = this.httpPath + '/find_invoice_by_store_id';
  static update_invoice_order_status_by_order_id = this.httpPath + '/update_invoice_order_status_by_order_id';

  // invoice event
  static create_invoice_event = this.httpPath + '/create_invoice_event';
  static find_invoice_event_by_order_id = this.httpPath + '/find_invoice_event_by_order_id';

  // tool
  static find_crypto_price = this.httpPath + '/find_crypto_price';
}
