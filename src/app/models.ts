export interface Feed {
  readonly id: string;
  readonly name: string;
}

export interface File {
  readonly id: string;
  readonly name: string;
  readonly feed: Feed;
  readonly url: string;
}
