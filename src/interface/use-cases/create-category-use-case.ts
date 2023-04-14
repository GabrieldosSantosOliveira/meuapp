import { Category } from '@/app/entities';
export interface ICreateCategoryUseCaseParams {
  title: string;
}
export interface ICreateCategoryUseCase {
  handle(params: ICreateCategoryUseCaseParams): Promise<Category>;
}
