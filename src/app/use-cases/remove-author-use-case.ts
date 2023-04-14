import { IRemoveAuthorUseCase } from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  LoadAuthorByIdRepository,
  RemoveAuthorRepository,
} from '../repositories';
export interface RemoveAuthorUseCaseConstructorParams {
  removeAuthorRepository: RemoveAuthorRepository;
  loadAuthorByIdRepository: LoadAuthorByIdRepository;
}
export class RemoveAuthorUseCase implements IRemoveAuthorUseCase {
  constructor(private readonly params: RemoveAuthorUseCaseConstructorParams) {}
  async handle(id: string): Promise<void> {
    const authorExists = await this.params.loadAuthorByIdRepository.findById(
      id,
    );
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    await this.params.removeAuthorRepository.remove(authorExists);
  }
}
