import { Notice } from '@/app/entities';
import {
  Notice as RawNotice,
  Author as RawAuthor,
  Category as RawCategory,
  Content as RawContent,
} from '@prisma/client';

import { PrismaAuthorMapper } from './prisma-author-mapper';
import { PrismaCategoryMapper } from './prisma-category-mapper';
import { PrismaContentMapper } from './prisma-content-mapper';
export interface PrismaNoticeMapperToDomainParams {
  rawNotice: RawNotice;
  rawAuthor: RawAuthor;
  rawCategory: RawCategory;
  rawContent: RawContent[];
}
export class PrismaNoticeMapper {
  static toDomain({
    rawAuthor,
    rawCategory,
    rawNotice,
    rawContent,
  }: PrismaNoticeMapperToDomainParams): Notice {
    return new Notice({
      author: PrismaAuthorMapper.toDomain(rawAuthor),
      category: PrismaCategoryMapper.toDomain(rawCategory),
      content: rawContent.map(PrismaContentMapper.toDomain),
      description: rawNotice.description,
      image: rawNotice.image,
      title: rawNotice.title,
      createdAt: rawNotice.createdAt,
      id: rawNotice.id,
      updatedAt: rawNotice.updatedAt,
    });
  }
  static toPrisma(notice: Notice): RawNotice {
    return {
      authorId: notice.author.id,
      categoryId: notice.category.id,
      createdAt: notice.createdAt,
      description: notice.description,
      id: notice.id,
      image: notice.image,
      title: notice.title,
      updatedAt: notice.updatedAt,
    };
  }
}
