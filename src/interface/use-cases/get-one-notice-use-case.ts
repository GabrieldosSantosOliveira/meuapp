import { Notice } from '@/app/entities';

export interface IGetOneNoticeUseCase {
  handle(id: string): Promise<Notice>;
}
