export interface GenerateRandomNumber {
  length: number;
}
export interface IServiceRandomNumber {
  generateRandomNumber(options: GenerateRandomNumber): number;
}
