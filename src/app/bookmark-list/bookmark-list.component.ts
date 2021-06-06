import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { BookmarkDeletionComponent } from '../bookmark-deletion';
import { BookmarkFormComponent } from '../bookmark-form';
import { BookmarksStoreService } from '../store';
import { Bookmark, BookmarkGroup } from '../store/bookmark-manager.models';

@Component({
  selector: 'bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  providers: [BookmarksStoreService],
})
export class BookmarkListComponent {
  readonly groups = Object.values(BookmarkGroup);

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

  onDeleteBookmark(bookmark: Bookmark): void {
    this.dialog
      .open(BookmarkDeletionComponent, this.createDialogConfig(bookmark.name))
      .afterClosed()
      .pipe(
        take(1),
        filter((should) => should),
      )
      .subscribe(() => this.bookmarks.deleteBookmark(bookmark.id));
  }

  private openBookmarkFormInADialog(
    data: Bookmark | undefined,
  ): Observable<Bookmark> {
    return this.dialog
      .open(BookmarkFormComponent, this.createDialogConfig(data))
      .afterClosed();
  }

  private createDialogConfig(data: unknown): MatDialogConfig {
    return { data, disableClose: true, width: '480px' };
  }
}
