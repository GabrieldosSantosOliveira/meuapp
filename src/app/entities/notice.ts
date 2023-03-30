import { Replace } from '@/helpers/replace';
import { randomUUID } from 'node:crypto';

import { Author, Category, Content } from './';

export interface NoticeProps {
  id: string;
  title: string;
  description: string;
  image: string;
  content: Content[];
  author: Author;
  category: Category;
  updatedAt: Date;
  createdAt: Date;
}

export class Notice {
  private props: NoticeProps;
  constructor(
    props: Replace<
      NoticeProps,
      { updatedAt?: Date; createdAt?: Date; id?: string }
    >,
  ) {
    this.props = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...props,
    };
  }

  public get id(): string {
    return this.props.id;
  }
  public get author(): Author {
    return this.props.author;
  }
  public set author(author: Author) {
    this.props.author = author;
  }
  public get category(): Category {
    return this.props.category;
  }
  public set category(category: Category) {
    this.props.category = category;
  }
  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get title(): string {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
  }
  public get description(): string {
    return this.props.description;
  }
  public set description(description: string) {
    this.props.description = description;
  }
  public get image(): string {
    return this.props.image;
  }
  public set image(image: string) {
    this.props.image = image;
  }
  public get content(): Content[] {
    return this.props.content;
  }
  public set content(content: Content[]) {
    this.props.content = content;
  }
}
