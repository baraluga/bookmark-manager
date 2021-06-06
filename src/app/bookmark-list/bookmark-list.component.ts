import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { BookmarkFormComponent } from '../bookmark-form';
import { BookmarksStoreService } from '../store';
import { Bookmark } from '../store/bookmark-manager.models';

@Component({
  selector: 'bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  providers: [BookmarksStoreService],
})
export class BookmarkListComponent {
  bookmarks$: Observable<Bookmark[]>;

  constructor(
    private bookmarks: BookmarksStoreService,
    private dialog: MatDialog,
  ) {
    this.bookmarks$ = bookmarks.bookmarkList$;
  }

  onAddBookmark(): void {
    this.openBookmarkFormInADialog(undefined)
      .pipe(
        take(1),
        filter((data) => !!data),
      )
      .subscribe((bookmark) => this.bookmarks.addBookmark(bookmark));
  }

  onEditBookmark(bookmark: Bookmark): void {
    this.openBookmarkFormInADialog(bookmark)
      .pipe(
        take(1),
        filter((data) => !!data),
      )
      .subscribe((bookmark) => this.bookmarks.editBookmark(bookmark));
  }

  onDeleteBookmark(id: string): void {
    this.bookmarks.deleteBookmark(id);
  }

  private openBookmarkFormInADialog(data: Bookmark | undefined): Observable<Bookmark> {
    return this.dialog
      .open(BookmarkFormComponent, {
        data,
        disableClose: true,
        width: '480px',
      })
      .afterClosed();
  }
}
