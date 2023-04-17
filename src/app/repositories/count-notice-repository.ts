export interface CountNoticeRepository {
  count(): Promise<number>;
}
