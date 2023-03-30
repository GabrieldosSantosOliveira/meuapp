/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DefaultFieldType {
  [key: string | number | symbol]: any;
}
export interface ValidateMissingParams {
  validate<T extends DefaultFieldType>(
    params: string[],
    fields: T,
  ): Error | undefined;
}
