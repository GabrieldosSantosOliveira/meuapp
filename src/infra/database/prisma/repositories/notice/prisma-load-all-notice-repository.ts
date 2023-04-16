import { Notice } from '@/app/entities';
import { LoadAllNoticeRepository } from '@/app/repositories';

import { PrismaNoticeMapper } from '../../mappers/prisma-notice-mapper';
import { PrismaService } from '../../prisma-service';

export class PrismaLoadAllNoticeRepository implements LoadAllNoticeRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Notice[]> {
    const rawNotices = await this.prismaService.notice.findMany({
      include: { Author: true, Category: true, Content: true },
    });

    return rawNotices.map((rawNotice) =>
      PrismaNoticeMapper.toDomain({
        rawAuthor: rawNotice.Author,
        rawCategory: rawNotice.Category,
        rawContent: rawNotice.Content,
        rawNotice: rawNotice,
      }),
    );
  }
}
