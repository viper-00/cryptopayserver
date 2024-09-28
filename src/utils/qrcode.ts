import { COINS } from 'packages/constants/blockchain';
import QRCode from 'qrcode';

export function GenerateQrCode(content: string) {
  return QRCode.toDataURL(content);
}

export function GetImgSrcByCrypto(crypto: string): string {
  const baseUrl = 'http://127.0.0.1:8888';

  switch (crypto) {
    case COINS.BTC:
      return baseUrl + '/btc.svg';
    case COINS.ETH:
      return baseUrl + '/eth.svg';
    default:
      return '';
  }
}
