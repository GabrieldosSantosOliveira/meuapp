import { Payload } from '@/interface/auth';
import { IGetAuthorUseCase } from '@/interface/use-cases/get-author';
import { AuthorNotFoundException } from '@/utils/http/exception/author-not-found-exception';

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
