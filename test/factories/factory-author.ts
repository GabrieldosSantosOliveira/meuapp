import { Author, AuthorProps } from '@/app/entities';
export const makeAuthor = (author: Partial<AuthorProps> = {}) => {
  return new Author({
    email: 'any_email@gmail.com',
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    password: 'any_password',
    picture: 'any_picture',
    ...author,
  });
};
