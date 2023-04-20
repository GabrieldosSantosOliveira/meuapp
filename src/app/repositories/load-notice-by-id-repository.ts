import { Notice } from '../entities';

export interface LoadNoticeByIdRepository {
  findById(id: string): Promise<Notice | null>;
}
