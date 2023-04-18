import { Notice } from '@/app/entities';

import { AuthorViewModel, CategoryViewModel, ContentViewModel } from './';

export class NoticeViewModel {
  public static toHTTP(notice: Notice) {
    return {
      id: notice.id,
      author: AuthorViewModel.toHTTP(notice.author),
      category: CategoryViewModel.toHTTP(notice.category),
      content: notice.content.map(ContentViewModel.toHTTP),
      createdAt: notice.createdAt,
      description: notice.description,
      image: notice.image,
      title: notice.title,
      updatedAt: notice.updatedAt,
    };
  }
}
