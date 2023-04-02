import { Author } from '@/app/entities';
import { Author as RawAuthor } from '@prisma/client';
export class PrismaAuthorMapper {
  public static toDomain(rawAuthor: RawAuthor): Author {
    return new Author({
      email: rawAuthor.email,
      firstName: rawAuthor.firstName,
      lastName: rawAuthor.lastName,
      createdAt: rawAuthor.createdAt,
      googleId: rawAuthor.googleId ?? undefined,
      id: rawAuthor.id,
      password: rawAuthor.password ?? undefined,
      picture: rawAuthor.picture ?? undefined,
      resetPasswordExpires: rawAuthor.resetPasswordExpires ?? undefined,
      resetPasswordToken: rawAuthor.resetPasswordToken ?? undefined,
      updatedAt: rawAuthor.updatedAt,
    });
  }
  public static toPrisma(author: Author): RawAuthor {
    return {
      createdAt: author.createdAt,
      email: author.email,
      firstName: author.firstName,
      googleId: author.googleId ?? null,
      id: author.id,
      lastName: author.lastName,
      password: author.password ?? null,
      picture: author.picture ?? null,
      resetPasswordExpires: author.resetPasswordExpires ?? null,
      resetPasswordToken: author.resetPasswordToken ?? null,
      updatedAt: author.updatedAt,
    };
  }
}
