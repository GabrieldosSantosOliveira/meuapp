import { CountNoticeRepository } from '@/app/repositories';

import { PrismaService } from '../../prisma-service';

export class PrismaCountNoticeRepository implements CountNoticeRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async count(): Promise<number> {
    return this.prismaService.notice.count();
  }
}
