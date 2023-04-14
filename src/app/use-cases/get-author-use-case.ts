import { Payload } from '@/interface/auth';
import { IGetAuthorUseCase } from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/index';

import { Author } from '../entities';
import { LoadAuthorByIdRepository } from '../repositories';
export interface GetAuthorUseCaseParams {
  loadAuthorByIdRepository: LoadAuthorByIdRepository;
}
export class GetAuthorUseCase implements IGetAuthorUseCase {
  constructor(private readonly params: GetAuthorUseCaseParams) {}
  async handle(data: Payload): Promise<Author> {
    const author = await this.params.loadAuthorByIdRepository.findById(
      data.sub,
    );
    if (!author) {
      throw new AuthorNotFoundException();
    }
    return author;
  }
}
