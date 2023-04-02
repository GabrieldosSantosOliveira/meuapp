export interface HashComparer {
  compare(textForCompare: string, hash: string): Promise<boolean>;
}
