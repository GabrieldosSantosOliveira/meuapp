import { Notice } from '@/app/entities';
import { LoadAllNoticeRepository } from '@/app/repositories';
import { IGetAllNoticeUseCase } from '@/interface/use-cases';
export interface GetAllNoticeUseCaseConstructorParams {
  loadAllNoticeRepository: LoadAllNoticeRepository;
}
export class GetAllNoticeUseCase implements IGetAllNoticeUseCase {
  constructor(private readonly params: GetAllNoticeUseCaseConstructorParams) {}
  async handle(): Promise<Notice[]> {
    return await this.params.loadAllNoticeRepository.findAll();
  }
}
