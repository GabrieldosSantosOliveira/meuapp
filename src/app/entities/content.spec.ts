import { makeContent } from '@/test/factories';

import { Content } from './';
describe('Content', () => {
  it('should be able create a new content', () => {
    const content = makeContent();
    expect(content).toBeInstanceOf(Content);
  });
});
