import {
  CountNoticeByCategoryRepository,
  LoadAllNoticeByCategoryRepository,
  LoadCategoryByTitleRepository,
} from '@/app/repositories';
import {
  IGetAllNoticeByCategoryUseCase,
  IGetAllNoticeByCategoryUseCaseOptions,
  IGetAllNoticeByCategoryUseCaseResponse,
  Info,
} from '@/interface/use-cases';
import { CategoryNotFoundException } from '@/utils/http';
export interface GetAllNoticeByCategoryUseCaseConstructorParams {
  loadAllNoticeByCategoryRepository: LoadAllNoticeByCategoryRepository;
  countNoticeByCategoryRepository: CountNoticeByCategoryRepository;
  loadCategoryByTitleRepository: LoadCategoryByTitleRepository;
}
export class GetAllNoticeByCategoryUseCase
  implements IGetAllNoticeByCategoryUseCase
{
  constructor(
    private readonly params: GetAllNoticeByCategoryUseCaseConstructorParams,
  ) {}
  async handle(
    options: IGetAllNoticeByCategoryUseCaseOptions,
  ): Promise<IGetAllNoticeByCategoryUseCaseResponse> {
    const { BASE_URL, SIZE_FOR_PAGE, page, category } = options;
    const categoryExists =
      await this.params.loadCategoryByTitleRepository.findByTitle(category);
    if (!categoryExists) {
      throw new CategoryNotFoundException();
    }
    let next: string | null = null;
    let prev: string | null = null;

    const [notices, countOfNotices] = await Promise.all([
      this.params.loadAllNoticeByCategoryRepository.findAllByCategoryByPage({
        page,
        sizeForPage: SIZE_FOR_PAGE,
        category: categoryExists,
      }),
      this.params.countNoticeByCategoryRepository.countByCategory(
        categoryExists,
      ),
    ]);
    const pages = Math.ceil(countOfNotices / SIZE_FOR_PAGE);
    if (page - 1 > 0 && page <= pages) {
      prev = new URL(
        `/api/notice/category/${categoryExists.title}?page=${page - 1}`,
        BASE_URL,
      ).toString();
    }
    if (page < pages) {
      next = new URL(
        `/api/notice/category/${categoryExists.title}?page=${page + 1}`,
        BASE_URL,
      ).toString();
    }
    const info: Info = {
      count: countOfNotices,
      pages,
      next,
      prev,
    };
    return {
      notices,
      info,
    };
  }
}
