export interface HttpExceptionProps {
  error: Error;
  cause?: Error;
}
export class HttpException extends Error {
  constructor(
    private readonly statusCode: number,
    private readonly options: HttpExceptionProps,
  ) {
    super();
    this.name = 'HttpException';
  }
  public getStatusCode(): number {
    return this.statusCode;
  }

  public getOptions() {
    return this.options;
  }
}
