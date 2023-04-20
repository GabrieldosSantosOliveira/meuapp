import { Category, Notice } from '@/app/entities';
import {
  CountNoticeByCategoryRepository,
  CountNoticeRepository,
  CreateNoticeRepository,
  LoadAllNoticeByCategoryRepository,
  LoadAllNoticeByCategoryRepositoryOptions,
  LoadAllNoticeRepository,
  LoadAllNoticeRepositoryOptions,
  LoadNoticeByIdRepository,
} from '@/app/repositories';

export class InMemoryNoticeRepository
  implements
    LoadAllNoticeRepository,
    CreateNoticeRepository,
    CountNoticeRepository,
    CountNoticeByCategoryRepository,
    LoadAllNoticeByCategoryRepository,
    LoadNoticeByIdRepository
{
  private notices: Notice[] = [];
  async findById(id: string): Promise<Notice | null> {
    const notice = this.notices.find((notice) => notice.id === id);
    if (!notice) {
      return null;
    }
    return notice;
  }
  async findAllByCategoryByPage(
    options: LoadAllNoticeByCategoryRepositoryOptions,
  ): Promise<Notice[]> {
    const PAGE = Math.max(options.page, 1);
    const SIZE_FOR_PAGE = options.sizeForPage;
    const SKIP = Math.max((PAGE - 1) * SIZE_FOR_PAGE, 0);
    return this.notices
      .filter((notice) => notice.category.id === options.category.id)
      .splice(SKIP, SKIP + SIZE_FOR_PAGE);
  }
  async countByCategory(category: Category): Promise<number> {
    return this.notices.filter((notice) => notice.category.id === category.id)
      .length;
  }
  async create(notice: Notice): Promise<void> {
    this.notices.push(notice);
  }
  async findAllByPage(
    options: LoadAllNoticeRepositoryOptions,
  ): Promise<Notice[]> {
    const PAGE = Math.max(options.page, 1);
    const SIZE_FOR_PAGE = options.sizeForPage;
    const SKIP = Math.max((PAGE - 1) * SIZE_FOR_PAGE, 0);
    return this.notices
      .filter((notice) => Boolean(notice))
      .splice(SKIP, SKIP + SIZE_FOR_PAGE);
  }
  async count(): Promise<number> {
    return this.notices.length;
  }
}
