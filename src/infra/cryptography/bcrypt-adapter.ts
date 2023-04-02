import { Hash, HashComparer } from '@/interface/index';
import { compare, hash } from 'bcrypt';
export class BcryptAdapter implements Hash, HashComparer {
  constructor(private readonly salt: number) {}
  async compare(textForCompare: string, hash: string): Promise<boolean> {
    return await compare(textForCompare, hash);
  }
  async hash(data: string): Promise<string> {
    return await hash(data, this.salt);
  }
}
