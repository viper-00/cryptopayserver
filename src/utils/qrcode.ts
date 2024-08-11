import QRCode from 'qrcode';

export async function GenerateQrCode(content: string) {
  return QRCode.toDataURL(content);
}
