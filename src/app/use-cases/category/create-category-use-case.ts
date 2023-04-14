import { Category } from '@/app/entities';
import {
  CreateCategoryRepository,
  LoadCategoryByTitleRepository,
} from '@/app/repositories';
import {
  ICreateCategoryUseCase,
  ICreateCategoryUseCaseParams,
} from '@/interface/use-cases';
import { ConflictCategoryAlreadyExistsException } from '@/utils/http';
export interface CreateCategoryUseCaseConstructorParams {
  createCategoryRepository: CreateCategoryRepository;
  loadCategoryByTitleRepository: LoadCategoryByTitleRepository;
}
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    private readonly params: CreateCategoryUseCaseConstructorParams,
  ) {}
  async handle(params: ICreateCategoryUseCaseParams): Promise<Category> {
    const categoryAlreadyExists =
      await this.params.loadCategoryByTitleRepository.findByTitle(params.title);
    if (categoryAlreadyExists) {
      throw new ConflictCategoryAlreadyExistsException();
    }
    const category = new Category({
      title: params.title,
    });
    await this.params.createCategoryRepository.create(category);
    return category;
  }
}
