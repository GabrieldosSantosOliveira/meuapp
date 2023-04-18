import { Notice } from '@/app/entities';

import { Payload } from '../auth';

export interface ICreateNoticeUseCaseParams {
  content: Content[];
  title: string;
  description: string;
  image: string;
  category: string;
  user: Payload;
}
export interface Content {
  heading?: string;
  text: string;
}
export interface ICreateNoticeUseCase {
  handle(params: ICreateNoticeUseCaseParams): Promise<Notice>;
}
