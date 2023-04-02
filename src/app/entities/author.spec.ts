import { makeAuthor } from '@/test/factories';

import { Author } from './';
describe('Author', () => {
  it('should be able create a new author', () => {
    const author = makeAuthor();
    expect(author).toBeInstanceOf(Author);
  });
});
