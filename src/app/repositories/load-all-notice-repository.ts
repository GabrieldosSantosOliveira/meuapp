import { Notice } from '../entities';
export interface LoadAllNoticeRepositoryOptions {
  page: number;
  sizeForPage: number;
}
export interface LoadAllNoticeRepository {
  findAllByPage(options: LoadAllNoticeRepositoryOptions): Promise<Notice[]>;
}
