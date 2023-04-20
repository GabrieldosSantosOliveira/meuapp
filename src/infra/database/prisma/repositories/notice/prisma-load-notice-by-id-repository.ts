import { Notice } from '@/app/entities';
import { LoadNoticeByIdRepository } from '@/app/repositories';

import { PrismaNoticeMapper } from '../../mappers';
import { PrismaService } from '../../prisma-service';

export class PrismaLoadNoticeByIdRepository
  implements LoadNoticeByIdRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: string): Promise<Notice | null> {
    const rawNotice = await this.prismaService.notice.findUnique({
      where: {
        id,
      },
      include: {
        Author: true,
        Category: true,
        Content: true,
      },
    });
    if (!rawNotice) {
      return null;
    }
    return PrismaNoticeMapper.toDomain({
      rawAuthor: rawNotice.Author,
      rawCategory: rawNotice.Category,
      rawContent: rawNotice.Content,
      rawNotice: rawNotice,
    });
  }
}
