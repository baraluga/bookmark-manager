/* eslint-disable ngrx/action-hygiene */
import { createAction, props } from '@ngrx/store';
import { Bookmark } from './bookmark-manager.models';

const createActionType = (action: string) => `[Bookmarks] ${action} Bookmark`;
const addBookmark = createAction(
  createActionType('Add'),
  props<Partial<Bookmark>>(),
);
const editBookmark = createAction(createActionType('Edit'), props<Bookmark>());
const deleteBookmark = createAction(
  createActionType('Delete'),
  props<{ id: string }>(),
);

export const BookmarksActions = {
  addBookmark,
  editBookmark,
  deleteBookmark,
};
