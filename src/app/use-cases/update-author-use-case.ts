import {
  IUpdateAuthorUseCase,
  IUpdateAuthorUseCaseParams,
} from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  LoadAuthorByIdRepository,
  SaveAuthorRepository,
} from '../repositories';
export interface UpdateAuthorUseCaseConstructorParams {
  saveAuthorRepository: SaveAuthorRepository;
  loadAuthorByIdRepository: LoadAuthorByIdRepository;
}
export class UpdateAuthorUseCase implements IUpdateAuthorUseCase {
  constructor(private readonly params: UpdateAuthorUseCaseConstructorParams) {}
  async handle(data: IUpdateAuthorUseCaseParams): Promise<void> {
    const hasAuthor = await this.params.loadAuthorByIdRepository.findById(
      data.user.sub,
    );
    if (!hasAuthor) {
      throw new AuthorNotFoundException();
    }
    if (data.firstName) hasAuthor.firstName = data.firstName;
    if (data.lastName) hasAuthor.lastName = data.lastName;
    if (data.picture) hasAuthor.picture = data.picture;
    hasAuthor.updatedAt = new Date();
    await this.params.saveAuthorRepository.save(hasAuthor);
  }
}
