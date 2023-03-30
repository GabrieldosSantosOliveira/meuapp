import { Replace } from '@/helpers/index';
import { randomUUID } from 'node:crypto';

export interface CategoryProps {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}
export class Category {
  private props: CategoryProps;
  constructor(
    props: Replace<
      CategoryProps,
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
  public get title(): string {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
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
}
