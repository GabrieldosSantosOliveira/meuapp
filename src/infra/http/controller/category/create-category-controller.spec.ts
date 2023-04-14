import { Category } from '@/app/entities';
import { HttpResponse } from '@/helpers/http';
import { IHttpRequest } from '@/interface/http';
import {
  ICreateCategoryUseCase,
  ICreateCategoryUseCaseParams,
} from '@/interface/use-cases';
import { makeCategory } from '@/test/factories';
import { InvalidParamError, MissingParamError } from '@/utils/http';

import { CategoryViewModel } from '../../view-models/category-view-model';
import {
  CreateCategoryController,
  CreateCategoryControllerRequest,
} from './create-category-controller';
class CreateCategoryUseCaseSpy implements ICreateCategoryUseCase {
  title!: string;
  category!: Category;
  async handle(params: ICreateCategoryUseCaseParams): Promise<Category> {
    this.title = params.title;
    this.category = makeCategory();
    return this.category;
  }
}
class CreateCategoryUseCaseWithError implements ICreateCategoryUseCase {
  async handle(): Promise<Category> {
    throw new Error();
  }
}
const makeCreateCategoryUseCaseSpy = () => {
  const createCategoryUseCaseSpy = new CreateCategoryUseCaseSpy();
  return { createCategoryUseCaseSpy };
};
const makeSut = () => {
  const { createCategoryUseCaseSpy } = makeCreateCategoryUseCaseSpy();
  const sut = new CreateCategoryController({
    createCategoryUseCase: createCategoryUseCaseSpy,
  });
  return { sut, createCategoryUseCaseSpy };
};
const makeRequest = (
  params: Partial<CreateCategoryControllerRequest> = {},
): IHttpRequest<CreateCategoryControllerRequest> => {
  return {
    user: { sub: 'any_id' },
    body: { title: 'any_title', ...params },
  };
};
describe('CreateCategoryController', () => {
  it('should return 400 if title is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ title: undefined }));
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new MissingParamError('title')),
    );
  });
  it('should return 400 if title is not empty', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ title: ' ' }));
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('title should not be empty'),
      ),
    );
  });
  it('should return 500 if CreateCategoryUseCase throw', async () => {
    const createCategoryUseCaseWithError = new CreateCategoryUseCaseWithError();
    const sut = new CreateCategoryController({
      createCategoryUseCase: createCategoryUseCaseWithError,
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
  it('should call CreateCategoryUseCase with correct params', async () => {
    const { sut, createCategoryUseCaseSpy } = makeSut();
    const request = makeRequest();
    await sut.handle(request);
    expect(createCategoryUseCaseSpy.title).toEqual(request.body.title);
  });
  it('should return 201 if success', async () => {
    const { sut, createCategoryUseCaseSpy } = makeSut();
    const request = makeRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(
      HttpResponse.created(
        CategoryViewModel.toHTTP(createCategoryUseCaseSpy.category),
      ),
    );
  });
  it('should return 500 if user is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ body: { title: 'any_title' } });
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
});
