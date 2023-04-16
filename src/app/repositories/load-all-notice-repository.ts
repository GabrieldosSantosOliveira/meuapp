import { Notice } from '../entities';

export interface LoadAllNoticeRepository {
  findAll(): Promise<Notice[]>;
}
