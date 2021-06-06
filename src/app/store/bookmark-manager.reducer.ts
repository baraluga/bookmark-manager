import { Action, createReducer, on } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { BookmarksActions } from './bookmark-manager.actions';
import {
  Bookmark,
  BookmarkGroup,
  BookmarksState,
} from './bookmark-manager.models';

export const INITIAL_STATE: BookmarksState = {
  0: {
    id: '0',
    name: 'Sample Name',
    url: 'www.google.com',
    group: BookmarkGroup.WORK,
  },
  1: {
    id: '1',
    name: 'Another Bookmark',
    url: 'www.reddit.com',
    group: BookmarkGroup.LEISURE,
  },
  2: {
    id: '2',
    name: 'Yet Another Bookmark',
    url: 'www.ynab.com',
    group: BookmarkGroup.PERSONAL,
  },
};
export const BOOKMARKS_STATE_KEY = 'bookmarks';

function onAddBookmark(
  state: BookmarksState,
  bookmark: Partial<Bookmark>,
): BookmarksState {
  const id = nanoid();
  const withId = { ...bookmark, id } as Bookmark;

  return { ...state, [id]: withId };
}

function onEditBookmark(
  state: BookmarksState,
  bookmark: Bookmark,
): BookmarksState {
  return { ...state, [bookmark.id]: bookmark };
}

function onDeleteBookmark(
  state: BookmarksState,
  { id }: { id: string },
): BookmarksState {
  const currentState = { ...state };
  delete currentState[id];
  return currentState;
}

const localBookmarksReducer = createReducer(
  INITIAL_STATE,
  on(BookmarksActions.addBookmark, onAddBookmark),
  on(BookmarksActions.editBookmark, onEditBookmark),
  on(BookmarksActions.deleteBookmark, onDeleteBookmark),
);
export function bookmarksReducer(
  state: BookmarksState | undefined,
  action: Action,
) {
  return localBookmarksReducer(state, action);
}

export const ActionHandlers = {
  onAddOrEditBookmark: onEditBookmark,
  onDeleteBookmark,
};
