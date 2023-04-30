import { Notice } from '@/app/entities';
import {
  LoadAllNoticeByCategoryRepository,
  LoadAllNoticeByCategoryRepositoryOptions,
} from '@/app/repositories';

import { PrismaCategoryMapper, PrismaNoticeMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaLoadAllNoticeByCategoryRepository
  implements LoadAllNoticeByCategoryRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findAllByCategoryByPage(
    options: LoadAllNoticeByCategoryRepositoryOptions,
  ): Promise<Notice[]> {
    const SKIP = Math.max((options.page - 1) * options.sizeForPage, 0);
    const rawCategory = PrismaCategoryMapper.toPrisma(options.category);
    const rawNotices = await this.prismaService.notice.findMany({
      include: { Author: true, Category: true, Content: true },
      take: options.sizeForPage,
      skip: SKIP,
      where: {
        categoryId: rawCategory.id,
      },
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
