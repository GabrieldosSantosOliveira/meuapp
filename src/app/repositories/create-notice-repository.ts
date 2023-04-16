import { Notice } from '../entities';

export interface CreateNoticeRepository {
  create(notice: Notice): Promise<void>;
}
