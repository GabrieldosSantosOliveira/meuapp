import { Content } from '@/app/entities';

export class ContentViewModel {
  static toHTTP(content: Content) {
    return {
      id: content.id,
      text: content.text,
      heading: content.heading,
    };
  }
}
