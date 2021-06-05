export interface Bookmark {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly group?: BookmarkGroup;
}

export enum BookmarkGroup {
  WORK = 'work',
  LEISURE = 'leisure',
  PERSONAL = 'personal',
}

export type BookmarksState = { [id: string]: Bookmark };
