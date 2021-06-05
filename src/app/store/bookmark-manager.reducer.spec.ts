import { BookmarksActions } from './bookmark-manager.actions';
import { Bookmark } from './bookmark-manager.models';
import { ActionHandlers, bookmarksReducer } from './bookmark-manager.reducer';

describe('BookmarksReducer', () => {
  it('should provide a valid reducer', () => {
    expect(
      bookmarksReducer(undefined, BookmarksActions.addBookmark)
    ).toBeTruthy();
  });

  it('onAddOrEditBookmark should upsert the specified bookmark', () => {
    const after = ActionHandlers.onAddOrEditBookmark({}, mockBookmark());
    expect(after['1']).toEqual(mockBookmark());
  });

  it('deleteBookmark should delete the specified bookmarkID', () => {
    const pre = ActionHandlers.onAddOrEditBookmark({}, mockBookmark());
    const after = ActionHandlers.onDeleteBookmark(pre, { id: '1' });
    expect(Object.values(after).length).toEqual(0);
  });
});

const mockBookmark = () =>
  ({ id: '1', name: 'bookmark1', tags: [], url: 'google.com' } as Bookmark);
