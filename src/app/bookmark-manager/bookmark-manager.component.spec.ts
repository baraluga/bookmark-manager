import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookmarkManagerComponent } from './bookmark-manager.component';
import { BookmarksStoreService } from '../store';
import { Bookmark } from '../store/bookmark-manager.models';

describe('BookmarkManagerComponent', () => {
  let service: BookmarksStoreService;
  let component: BookmarkManagerComponent;

  beforeEach(() => {
    service = mockService();
    component = new BookmarkManagerComponent(service);
  });

  it('should liase with store service for deleteBookmark', () => {
    const spy = spyOn(service, 'deleteBookmark');
    component.onDeleteBookmark('1');
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should provide the bookmarks via store service', (done) => {
    component.bookmarks$.pipe(take(1)).subscribe((bookmarks) => {
      expect(bookmarks[0].id).toEqual('0');
      done();
    });
  });

  it('should liaise with store service for addBookmark', () => {
    const spy = spyOn(service, 'addBookmark');
    component.onAddBookmark();
  });
  it('should liaise with store service for editBookmark', () => {
    const spy = spyOn(service, 'editBookmark');
    component.onEditBookmark('1');
  });
});

const mockService = () =>
  ({
    bookmarkList$: of([mockBookmark()]),
    deleteBookmark: (_) => {},
    addBookmark: (_) => {},
    editBookmark: (_) => {},
  } as BookmarksStoreService);
const mockBookmark = () =>
  ({ id: '0', name: '', tags: [], url: '' } as Bookmark);
