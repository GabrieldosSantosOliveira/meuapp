import { Payload } from '../auth';

export interface OptionsDecrypt {
  secret: string;
}
export interface Decrypt {
  decrypt(encryptText: string, options: OptionsDecrypt): Promise<Payload>;
}
