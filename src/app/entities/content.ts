import { Replace } from '@/helpers/index';
import { randomUUID } from 'crypto';

export interface ContentProps {
  id: string;
  heading?: string;
  text: string;
  updatedAt: Date;
  createdAt: Date;
}
export class Content {
  private props: ContentProps;
  constructor(
    props: Replace<
      ContentProps,
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
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
  public set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get heading(): string | undefined {
    return this.props.heading;
  }
  public set heading(heading: string | undefined) {
    this.props.heading = heading;
  }
  public get text(): string {
    return this.props.text;
  }
  public set text(text: string) {
    this.props.text = text;
  }
}
