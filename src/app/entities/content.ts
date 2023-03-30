export interface ContentProps {
  heading?: string;
  text: string;
}
export class Content {
  private props: ContentProps;
  constructor(props: ContentProps) {
    this.props = props;
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
