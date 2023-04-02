export interface OptionsEncrypt {
  secret: string;
  expire: number;
}
export interface Encrypt {
  encrypt(identifier: string, options: OptionsEncrypt): Promise<string>;
}
