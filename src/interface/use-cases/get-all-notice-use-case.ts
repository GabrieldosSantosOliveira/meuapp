import { Notice } from '@/app/entities';
export interface IGetAllNoticeUseCaseResponse {
  notices: Notice[];
  info: Info;
}
export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface IGetAllNoticeUseCaseOptions {
  page: number;
  BASE_URL: string;
  SIZE_FOR_PAGE: number;
}
export interface IGetAllNoticeUseCase {
  handle(
    options: IGetAllNoticeUseCaseOptions,
  ): Promise<IGetAllNoticeUseCaseResponse>;
}
