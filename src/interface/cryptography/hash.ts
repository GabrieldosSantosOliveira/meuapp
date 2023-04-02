export interface Hash {
  hash(data: string): Promise<string>;
}
