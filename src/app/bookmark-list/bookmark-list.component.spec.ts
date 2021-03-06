import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { BookmarkFormComponent } from '../bookmark-form';
import { BookmarksStoreService } from '../store';
import { Bookmark, BookmarkGroup } from '../store/bookmark-manager.models';
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
    component.bookmarks$.pipe(skip(1), take(1)).subscribe((bookmarks) => {
      expect(bookmarks.length).toEqual(1);
      expect(bookmarks[0].id).toEqual('0');
      expect(bookmarks[0].group).toEqual(BookmarkGroup.PERSONAL);
      done();
    });
    component.onActiveChipsChange([BookmarkGroup.PERSONAL]);
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
    bookmarkList$: of([mockBookmark(), mockBookmark(BookmarkGroup.PERSONAL)]),
    deleteBookmark: (_) => {},
    addBookmark: (_) => {},
    editBookmark: (_) => {},
  } as BookmarksStoreService);
const mockBookmark = (group?: BookmarkGroup) =>
  ({ id: '0', name: 'baraluga', url: 'hornpub.com', group } as Bookmark);
const afterClosedSubject = new Subject<Partial<Bookmark>>();
const mockDialogRef = () =>
  ({
    afterClosed: () => afterClosedSubject.asObservable(),
  } as MatDialogRef<BookmarkFormComponent>);
const mockDialog = () =>
  ({ open: (_: unknown) => mockDialogRef() } as MatDialog);
