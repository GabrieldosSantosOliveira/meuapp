import { Content } from '@/app/entities';

export class ContentViewModel {
  static toHTTP(content: Content) {
    return {
      text: content.text,
      heading: content.heading,
    };
  }
}
