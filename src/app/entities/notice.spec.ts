import { makeNotice } from '@/test/factories';

import { Notice } from './';
describe('Notice', () => {
  it('should be able create a new notice', () => {
    const notice = makeNotice();
    expect(notice).toBeInstanceOf(Notice);
  });
});
