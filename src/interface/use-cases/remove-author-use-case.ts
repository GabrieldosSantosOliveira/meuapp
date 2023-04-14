export interface IRemoveAuthorUseCase {
  handle(id: string): Promise<void>;
}
