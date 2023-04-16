import { Content, Notice } from '@/app/entities';
import {
  LoadAuthorByIdRepository,
  LoadCategoryByTitleRepository,
} from '@/app/repositories';
import { CreateNoticeRepository } from '@/app/repositories';
import {
  ICreateNoticeUseCase,
  ICreateNoticeUseCaseParams,
} from '@/interface/use-cases';
import {
  AuthorNotFoundException,
  CategoryNotFoundException,
} from '@/utils/http';
export interface CreateNoticeUseCaseConstructorParams {
  loadCategoryByTitleRepository: LoadCategoryByTitleRepository;
  loadAuthorByIdRepository: LoadAuthorByIdRepository;
  createNoticeRepository: CreateNoticeRepository;
}
export class CreateNoticeUseCase implements ICreateNoticeUseCase {
  constructor(private readonly params: CreateNoticeUseCaseConstructorParams) {}
  async handle(params: ICreateNoticeUseCaseParams): Promise<Notice> {
    const categoryExists =
      await this.params.loadCategoryByTitleRepository.findByTitle(
        params.category,
      );
    if (!categoryExists) {
      throw new CategoryNotFoundException();
    }
    const authorExists = await this.params.loadAuthorByIdRepository.findById(
      params.user.sub,
    );
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    const notice = new Notice({
      author: authorExists,
      category: categoryExists,
      content: params.content.map(
        ({ text, heading }) => new Content({ text, heading }),
      ),
      description: params.description,
      image: params.image,
      title: params.title,
    });
    await this.params.createNoticeRepository.create(notice);
    return notice;
  }
}
