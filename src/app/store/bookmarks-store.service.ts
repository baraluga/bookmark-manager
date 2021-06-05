import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookmarksActions } from './bookmark-manager.actions';
import { Bookmark, BookmarksState } from './bookmark-manager.models';

@Injectable()
export class BookmarksStoreService {
  readonly bookmarkList$: Observable<Bookmark[]>;

  constructor(private store: Store<BookmarksState>) {
    this.bookmarkList$ = store.pipe(map((state) => Object.values(state)));
  }

  addBookmark(bookmark: Bookmark): void {
    this.store.dispatch(BookmarksActions.addBookmark(bookmark));
  }

  editBookmark(bookmark: Bookmark): void {
    this.store.dispatch(BookmarksActions.editBookmark(bookmark));
  }

  deleteBookmark(id: string): void {
    this.store.dispatch(BookmarksActions.deleteBookmark({ id }));
  }
}
