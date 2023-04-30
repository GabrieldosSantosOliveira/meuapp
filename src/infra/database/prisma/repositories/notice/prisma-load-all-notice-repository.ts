import { Notice } from '@/app/entities';
import {
  LoadAllNoticeRepository,
  LoadAllNoticeRepositoryOptions,
} from '@/app/repositories';

import { PrismaNoticeMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaLoadAllNoticeRepository implements LoadAllNoticeRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAllByPage(
    options: LoadAllNoticeRepositoryOptions,
  ): Promise<Notice[]> {
    const SKIP = Math.max((options.page - 1) * options.sizeForPage, 0);
    const rawNotices = await this.prismaService.notice.findMany({
      include: { Author: true, Category: true, Content: true },
      take: options.sizeForPage,
      skip: SKIP,
      orderBy: {
        createdAt: 'desc',
      },
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
