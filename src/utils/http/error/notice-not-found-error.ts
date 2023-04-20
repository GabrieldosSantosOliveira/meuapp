export class NoticeNotFoundError extends Error {
  constructor() {
    super('Notice not found');
    this.name = 'NoticeNotFoundError';
  }
}
