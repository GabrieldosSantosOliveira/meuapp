import { makeCategory } from '@/test/factories';

import { Category } from './';
describe('Category', () => {
  it('should be able create a new category', () => {
    const category = makeCategory();
    expect(category).toBeInstanceOf(Category);
  });
});
