import { Action, createReducer, on } from '@ngrx/store';
import { BookmarksActions } from './bookmark-manager.actions';
import { Bookmark, BookmarksState } from './bookmark-manager.models';

export const INITIAL_STATE: BookmarksState = {};
export const BOOKMARKS_STATE_KEY = 'bookmarks';

const _bookmarksReducer = createReducer(
  INITIAL_STATE,
  on(BookmarksActions.addBookmark, onAddOrEditBookmark),
  on(BookmarksActions.editBookmark, onAddOrEditBookmark),
  on(BookmarksActions.deleteBookmark, onDeleteBookmark)
);

function onAddOrEditBookmark(
  state: BookmarksState,
  bookmark: Bookmark
): BookmarksState {
  return { ...state, [bookmark.id]: bookmark };
}

function onDeleteBookmark(
  state: BookmarksState,
  { id }: { id: string }
): BookmarksState {
  const currentState = { ...state };
  delete currentState[id];
  return currentState;
}

export function bookmarksReducer(
  state: BookmarksState | undefined,
  action: Action
) {
  return _bookmarksReducer(state, action);
}

export const ActionHandlers = {
  onAddOrEditBookmark,
  onDeleteBookmark,
};
