import { ServiceRandomNumber } from './service-random-number';

const makeSut = () => {
  const sut = new ServiceRandomNumber();
  return { sut };
};

describe('ServiceRandomNumber', () => {
  it('should return randomNumber with correct length', () => {
    const { sut } = makeSut();
    const randomNumber = sut.generateRandomNumber({ length: 10 });
    expect(randomNumber.toString().length).toBe(10);
  });
});
