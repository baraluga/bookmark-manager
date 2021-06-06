import { Action, createReducer, on } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { BookmarksActions } from './bookmark-manager.actions';
import {
  Bookmark,
  BookmarkGroup,
  BookmarksState,
} from './bookmark-manager.models';

export const INITIAL_STATE: BookmarksState = {
  sample: {
    id: 'sample',
    name: 'Sample Name',
    url: 'www.hornpub.com',
    group: BookmarkGroup.WORK,
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
