import { makeAuthor } from '@/test/factories';
describe('Author', () => {
  it('should be able create a new author', () => {
    const author = makeAuthor();
    expect(author).toBeTruthy();
  });
});
