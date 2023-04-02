export interface HttpExceptionProps {
  statusCode: number;
  error: Error;
}
export class HttpException extends Error {
  constructor(private readonly props: HttpExceptionProps) {
    super('HttpException');
    this.name = 'HttpException';
  }
  public get statusCode(): number {
    return this.props.statusCode;
  }
  public get error(): Error {
    return this.props.error;
  }
}
