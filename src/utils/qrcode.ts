import QRCode from 'qrcode';

export function GenerateQrCode(content: string) {
  return QRCode.toDataURL(content);
}
