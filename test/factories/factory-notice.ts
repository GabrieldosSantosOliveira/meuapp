import { Notice, NoticeProps } from '@/app/entities';

import { makeAuthor, makeCategory, makeContent } from './';

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
