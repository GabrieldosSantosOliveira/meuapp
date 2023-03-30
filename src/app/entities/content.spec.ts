import { makeContent } from '@/test/factories';
describe('Content', () => {
  it('should be able create a new content', () => {
    const content = makeContent();
    expect(content).toBeTruthy();
  });
});
