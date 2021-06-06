import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookmarkFormComponent } from '../bookmark-form';
import { BookmarksStoreService } from '../store';
import { Bookmark } from '../store/bookmark-manager.models';
import { BookmarkListComponent } from './bookmark-list.component';

describe('BookmarkListComponent', () => {
  let service: BookmarksStoreService;
  let component: BookmarkListComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    service = mockService();
    dialog = mockDialog();
    component = new BookmarkListComponent(service, dialog);
  });

  it('should liase with store service for deleteBookmark', (done) => {
    const spy = spyOn(service, 'deleteBookmark');
    component.onDeleteBookmark(mockBookmark());
    afterClosedSubject.subscribe(() => {
      expect(spy).toHaveBeenCalledWith('0');
      done();
    });
    afterClosedSubject.next(mockBookmark());
  });

  it('should provide the bookmarks via store service', (done) => {
    component.bookmarks$.pipe(take(1)).subscribe((bookmarks) => {
      expect(bookmarks[0].id).toEqual('0');
      done();
    });
  });

  it('should liaise with store service for addBookmark', (done) => {
    const spy = spyOn(service, 'addBookmark');
    component.onAddBookmark();
    afterClosedSubject.subscribe((bookmark) => {
      expect(spy).toHaveBeenCalledWith(bookmark);
      done();
    });
    afterClosedSubject.next(mockBookmark());
  });
  it('should liaise with store service for editBookmark', (done) => {
    const spy = spyOn(service, 'editBookmark');
    component.onEditBookmark(mockBookmark());
    afterClosedSubject.subscribe((bookmark) => {
      expect(spy).toHaveBeenCalledWith(bookmark as Bookmark);
      done();
    });
    afterClosedSubject.next(mockBookmark());
  });

  it('should open the dialog with the correct config', () => {
    const openDialogSpy = spyOn(dialog, 'open').and.callThrough();
    component.onAddBookmark();
    expect(openDialogSpy).toHaveBeenCalledWith(BookmarkFormComponent, {
      data: undefined,
      disableClose: true,
      width: '480px',
    });
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
  ({ id: '0', name: 'baraluga', url: 'hornpub.com' } as Bookmark);
const afterClosedSubject = new Subject<Partial<Bookmark>>();
const mockDialogRef = () =>
  ({
    afterClosed: () => afterClosedSubject.asObservable(),
  } as MatDialogRef<BookmarkFormComponent>);
const mockDialog = () =>
  ({ open: (_: unknown) => mockDialogRef() } as MatDialog);
