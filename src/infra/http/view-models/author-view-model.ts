import { Author } from '@/app/entities';

export class AuthorViewModel {
  public static toHTTP(author: Author) {
    return {
      id: author.id,
      email: author.email,
      firstName: author.firstName,
      lastName: author.lastName,
      googleId: author.googleId,
      updatedAt: author.updatedAt,
      picture: author.picture,
      createdAt: author.createdAt,
    };
  }
}
