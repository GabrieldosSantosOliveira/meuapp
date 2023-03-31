import { Content, ContentProps } from '@/app/entities';
export const makeContent = (content: Partial<ContentProps> = {}) => {
  return new Content({
    heading: 'any_heading',
    text: 'lorem ipsum',
    ...content,
  });
};
