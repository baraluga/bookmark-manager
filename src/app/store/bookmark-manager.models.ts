export interface Bookmark {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly tags: string[];
}

export type BookmarksState = { [id: string]: Bookmark };
