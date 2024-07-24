const bip39 = require('bip39');

export class Bip39 {
  static generateMnemonic(): string {
    // Defaults to 128-bits of entropy
    const mnemonic = bip39.generateMnemonic(128);
    return this.isMnemonicValid(mnemonic) ? mnemonic : this.generateMnemonic();
  }

  static isMnemonicValid(mnemonic: string): boolean {
    // Prevent repetition
    const words = mnemonic.split(' ');
    const wordSet = new Set(words);
    if (words.length === wordSet.size) {
      return true;
    }

    return false;
  }

  static validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
  }

  static async generateSeed(mnemonic: string) {
    return await bip39.mnemonicToSeed(mnemonic);
  }
}
