import { Notice } from '@/app/entities';
import {
  CountNoticeRepository,
  CreateNoticeRepository,
  LoadAllNoticeRepository,
  LoadAllNoticeRepositoryOptions,
} from '@/app/repositories';

export class InMemoryNoticeRepository
  implements
    LoadAllNoticeRepository,
    CreateNoticeRepository,
    CountNoticeRepository
{
  private notices: Notice[] = [];
  async create(notice: Notice): Promise<void> {
    this.notices.push(notice);
  }
  async findAllByPage(
    options: LoadAllNoticeRepositoryOptions,
  ): Promise<Notice[]> {
    const PAGE = Math.max(options.page, 1);
    const SIZE_FOR_PAGE = options.sizeForPage;
    const SKIP = Math.max((PAGE - 1) * SIZE_FOR_PAGE, 0);
    return this.notices.splice(SKIP, SKIP + SIZE_FOR_PAGE);
  }
  async count(): Promise<number> {
    return this.notices.length;
  }
}
