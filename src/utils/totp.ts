import { authenticator, hotp, totp } from 'otplib';

export function GenerateAuthenticatorSecret(): string {
  return authenticator.generateSecret();
}

export function VerifyAuthenticator(token: string, secret: string): boolean {
  try {
    return authenticator.check(token, secret);
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function VerifyTOTP(token: string, secret: string): boolean {
  try {
    return totp.check(token, secret);
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function VerifyHOTP(token: string, secret: string, counter: number): boolean {
  try {
    return hotp.check(token, secret, counter);
  } catch (e) {
    console.error(e);
    return false;
  }
}
