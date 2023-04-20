import {
  CountNoticeRepository,
  LoadAllNoticeRepository,
} from '@/app/repositories';
import {
  IGetAllNoticeUseCase,
  IGetAllNoticeUseCaseOptions,
  IGetAllNoticeUseCaseResponse,
  Info,
} from '@/interface/use-cases';
export interface GetAllNoticeUseCaseConstructorParams {
  loadAllNoticeRepository: LoadAllNoticeRepository;
  countNoticeRepository: CountNoticeRepository;
}
export class GetAllNoticeUseCase implements IGetAllNoticeUseCase {
  constructor(private readonly params: GetAllNoticeUseCaseConstructorParams) {}
  async handle(
    options: IGetAllNoticeUseCaseOptions,
  ): Promise<IGetAllNoticeUseCaseResponse> {
    const { BASE_URL, SIZE_FOR_PAGE, page } = options;
    let next: string | null = null;
    let prev: string | null = null;
    const [notices, countOfNotices] = await Promise.all([
      this.params.loadAllNoticeRepository.findAllByPage({
        page,
        sizeForPage: SIZE_FOR_PAGE,
      }),
      this.params.countNoticeRepository.count(),
    ]);
    const pages = Math.ceil(countOfNotices / SIZE_FOR_PAGE);
    if (page - 1 > 0 && page <= pages) {
      prev = new URL(`/api/notice?page=${page - 1}`, BASE_URL).toString();
    }
    if (page < pages) {
      next = new URL(`/api/notice?page=${page + 1}`, BASE_URL).toString();
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
