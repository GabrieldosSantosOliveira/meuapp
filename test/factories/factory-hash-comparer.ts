import { Hash, HashComparer } from '@/interface/index';

export class HashAndHashComparer implements Hash, HashComparer {
  public isValidHash = true;
  public hashText = 'any_hash';
  async compare(): Promise<boolean> {
    return this.isValidHash;
  }
  async hash(): Promise<string> {
    return this.hashText;
  }
}

export const makeHashAndHashComparer = () => {
  const hashAndHashComparer = new HashAndHashComparer();
  return { hashAndHashComparer };
};
