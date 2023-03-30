import { Replace } from '@/helpers/index';
import { randomUUID } from 'node:crypto';
export interface AuthorProps {
  id: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  picture?: string;
  updatedAt: Date;
  createdAt: Date;
}

export class Author {
  private props: AuthorProps;

  constructor(
    props: Replace<
      AuthorProps,
      { updatedAt?: Date; createdAt?: Date; id?: string }
    >,
  ) {
    this.props = {
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      id: props.id || randomUUID(),
      ...props,
    };
  }
  public get id(): string {
    return this.props.id;
  }
  public get firstName(): string {
    return this.props.firstName;
  }
  public set firstName(value: string) {
    this.props.firstName = value;
  }
  public get lastName(): string {
    return this.props.lastName;
  }
  public set lastName(value: string) {
    this.props.lastName = value;
  }
  public get email(): string {
    return this.props.email;
  }
  public set email(value: string) {
    this.props.email = value;
  }
  public get picture(): string | undefined {
    return this.props.picture;
  }
  public set picture(value: string | undefined) {
    this.props.picture = value;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
  public set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get password(): string | undefined {
    return this.props.password;
  }
  public set password(password: string | undefined) {
    this.props.password = password;
  }
}
