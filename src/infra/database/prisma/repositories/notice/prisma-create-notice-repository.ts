import { Notice } from '@/app/entities';
import { CreateNoticeRepository } from '@/app/repositories';

import { PrismaContentMapper, PrismaNoticeMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaCreateNoticeRepository implements CreateNoticeRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notice: Notice): Promise<void> {
    const raw = PrismaNoticeMapper.toPrisma(notice);
    await this.prismaService.notice.create({
      data: {
        ...raw,
        Content: { create: notice.content.map(PrismaContentMapper.toPrisma) },
      },
    });
  }
}
