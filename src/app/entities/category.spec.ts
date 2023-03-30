import { makeCategory } from '@/test/factories';
describe('Category', () => {
  it('should be able create a new category', () => {
    const category = makeCategory();
    expect(category).toBeTruthy();
  });
});
