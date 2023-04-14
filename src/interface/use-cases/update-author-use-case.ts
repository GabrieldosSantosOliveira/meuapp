import { Payload } from '../auth';

export interface IUpdateAuthorUseCaseParams {
  firstName?: string;
  lastName?: string;
  picture?: string;
  user: Payload;
}

export interface IUpdateAuthorUseCase {
  handle(data: IUpdateAuthorUseCaseParams): Promise<void>;
}
