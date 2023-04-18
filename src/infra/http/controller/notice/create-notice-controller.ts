import { HttpResponse } from '@/helpers/http';
import {
  ICreateNoticeUseCase,
  IHttpRequest,
  IHttpResponse,
  Controller,
} from '@/interface/index';
import { validate } from 'class-validator';

import {
  CreateContentBodyDto,
  CreateNoticeBodyDto,
} from '../../dtos/create-notice-body.dto';
import { ExceptionFilter } from '../../error';
import { NoticeViewModel } from '../../view-models/notice-view-model';
export interface CreateNoticeControllerRequest {
  content: Content[];
  title: string;
  description: string;
  image: string;
  category: string;
}
export interface Content {
  heading?: string;
  text: string;
}
export interface CreateNoticeControllerConstructorParams {
  createNoticeUseCase: ICreateNoticeUseCase;
}
export class CreateNoticeController implements Controller {
  constructor(
    private readonly params: CreateNoticeControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<CreateNoticeControllerRequest>,
  ): Promise<IHttpResponse> {
    try {
      if (!request.user) {
        return HttpResponse.serverError();
      }
      const createNoticeBodyDto = new CreateNoticeBodyDto();
      createNoticeBodyDto.category = request.body.category;
      createNoticeBodyDto.description = request.body.description;
      createNoticeBodyDto.image = request.body.image;
      createNoticeBodyDto.title = request.body.title;
      const createContentBodyDtos = request.body.content.map((content) => {
        const createContentBodyDto = new CreateContentBodyDto();
        Object.assign(createContentBodyDto, content);
        return createContentBodyDto;
      });
      createNoticeBodyDto.content = createContentBodyDtos;
      const hasErrors = await validate(createNoticeBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      const notice = await this.params.createNoticeUseCase.handle({
        user: request.user,
        ...createNoticeBodyDto,
      });
      return HttpResponse.created(NoticeViewModel.toHTTP(notice));
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
