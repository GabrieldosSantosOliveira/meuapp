import { Notice } from '@/app/entities';
import { LoadNoticeByIdRepository } from '@/app/repositories';
import { IGetOneNoticeUseCase } from '@/interface/use-cases';
import { NoticeNotFoundException } from '@/utils/http';
export interface GetOneNoticeUseCaseConstructorParams {
  loadNoticeByIdRepository: LoadNoticeByIdRepository;
}
export class GetOneNoticeUseCase implements IGetOneNoticeUseCase {
  constructor(private readonly params: GetOneNoticeUseCaseConstructorParams) {}
  async handle(id: string): Promise<Notice> {
    const noticeExists = await this.params.loadNoticeByIdRepository.findById(
      id,
    );
    if (!noticeExists) {
      throw new NoticeNotFoundException();
    }
    return noticeExists;
  }
}
