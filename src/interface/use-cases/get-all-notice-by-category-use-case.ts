import { Notice } from '@/app/entities';

import { Info } from './';
export interface IGetAllNoticeByCategoryUseCaseResponse {
  notices: Notice[];
  info: Info;
}

export interface IGetAllNoticeByCategoryUseCaseOptions {
  page: number;
  BASE_URL: string;
  SIZE_FOR_PAGE: number;
  category: string;
}
export interface IGetAllNoticeByCategoryUseCase {
  handle(
    options: IGetAllNoticeByCategoryUseCaseOptions,
  ): Promise<IGetAllNoticeByCategoryUseCaseResponse>;
}
