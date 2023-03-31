import { Notice, NoticeProps } from '@/app/entities';

import { makeAuthor } from './factory-author';
import { makeCategory } from './factory-category';
import { makeContent } from './factory-content';
export const makeNotice = (notice: Partial<NoticeProps> = {}) => {
  return new Notice({
    author: makeAuthor(),
    category: makeCategory(),
    content: [makeContent()],
    description: 'lorem ipsum',
    title: 'any_title',
    image: 'any_image',
    ...notice,
  });
};
