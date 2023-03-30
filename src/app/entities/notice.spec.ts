import { makeNotice } from '@/test/factories';
describe('Notice', () => {
  it('should be able create a new notice', () => {
    const notice = makeNotice();
    expect(notice).toBeTruthy();
  });
});
