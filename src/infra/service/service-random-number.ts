import {
  GenerateRandomNumber,
  IServiceRandomNumber,
} from '@/interface/service';

export class ServiceRandomNumber implements IServiceRandomNumber {
  generateRandomNumber(options: GenerateRandomNumber): number {
    const min = Math.ceil(Math.pow(10, options.length - 1));
    const max = Math.floor(Number('9'.repeat(options.length)));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
