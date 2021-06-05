import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookmarksActions } from './bookmark-manager.actions';
import { Bookmark, BookmarksState } from './bookmark-manager.models';
import { BookmarksStoreService } from './bookmarks-store.service';

describe('BookmarksStoreService', () => {
  let service: BookmarksStoreService;
  let store: Store<BookmarksState>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    store = mockStore();
    service = new BookmarksStoreService(store);

    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should dispatch the addBookmark action', () => {
    service.addBookmark(mockBookmark());
    expect(dispatchSpy).toHaveBeenCalledWith(
      BookmarksActions.addBookmark(mockBookmark())
    );
  });
  it('should dispatch the editBookmark action', () => {
    service.editBookmark(mockBookmark());
    expect(dispatchSpy).toHaveBeenCalledWith(
      BookmarksActions.editBookmark(mockBookmark())
    );
  });
  it('should dispatch the deleteBookmark action', () => {
    service.deleteBookmark('1');
    expect(dispatchSpy).toHaveBeenCalledWith(
      BookmarksActions.deleteBookmark({ id: '1' })
    );
  });
});

const mockStore = () =>
  ({
    pipe: () => of({ 1: mockBookmark() } as BookmarksState),
    dispatch: (_) => {},
  } as Store<BookmarksState>);
const mockBookmark = () =>
  ({
    id: '1',
    name: 'bookmark1',
    tags: ['personal'],
    url: 'www.google.com',
  } as Bookmark);
