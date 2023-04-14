export interface UrlValidator {
  isValid(url: string): Promise<boolean>;
}
