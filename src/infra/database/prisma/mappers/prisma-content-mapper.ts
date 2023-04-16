import { Content } from '@/app/entities';
import { Content as RawContent } from '@prisma/client';
export class PrismaContentMapper {
  static toPrisma(content: Content): Omit<RawContent, 'noticeId'> {
    return {
      createdAt: content.createdAt,
      heading: content.heading ?? null,
      id: content.id,
      text: content.text,
      updatedAt: content.updatedAt,
    };
  }
  static toDomain(rawContent: RawContent): Content {
    return new Content({
      text: rawContent.text,
      createdAt: rawContent.createdAt,
      heading: rawContent.heading || undefined,
      id: rawContent.id,
      updatedAt: rawContent.updatedAt,
    });
  }
}
