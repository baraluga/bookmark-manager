import { BookmarksActions } from './bookmark-manager.actions';
import { Bookmark } from './bookmark-manager.models';

describe('BookmarksActions', () => {
  it('should create the addBookmark action', () => {
    const created = BookmarksActions.addBookmark(mockBookmark());
    expect(created.type.includes('Add')).toBeTrue();
  });
  it('should create the editBookmark action', () => {
    const created = BookmarksActions.editBookmark(mockBookmark());
    expect(created.type.includes('Edit')).toBeTrue();
  });
  it('should create the deleteBookmark action', () => {
    const created = BookmarksActions.deleteBookmark({ id: '' });
    expect(created.type.includes('Delete')).toBeTrue();
  });
});

const mockBookmark = () => ({} as Bookmark);
