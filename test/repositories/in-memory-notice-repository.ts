import { Notice } from '@/app/entities';
import {
  CreateNoticeRepository,
  LoadAllNoticeRepository,
} from '@/app/repositories';

export class InMemoryNoticeRepository
  implements LoadAllNoticeRepository, CreateNoticeRepository
{
  private notices: Notice[] = [];
  async create(notice: Notice): Promise<void> {
    this.notices.push(notice);
  }
  async findAll(): Promise<Notice[]> {
    return this.notices;
  }
}
