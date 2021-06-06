import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
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
  private activeGroupChips = new BehaviorSubject<string[]>([]);

  readonly groups = Object.values(BookmarkGroup);

  bookmarks$: Observable<Bookmark[]>;

  constructor(
    private bookmarks: BookmarksStoreService,
    private dialog: MatDialog,
  ) {
    this.bookmarks$ = this.getBookmarksStream();
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

  onActiveChipsChange(active: string[]): void {
    this.activeGroupChips.next(active);
  }

  private getBookmarksStream(): Observable<Bookmark[]> {
    return combineLatest([
      this.bookmarks.bookmarkList$,
      this.activeGroupChips,
    ]).pipe(
      map(([bookmarks, chips]) =>
        this.filterMatchedBookmarkGroups(bookmarks, chips),
      ),
    );
  }

  private filterMatchedBookmarkGroups(
    bookmarks: Bookmark[],
    groups: string[],
  ): Bookmark[] {
    return bookmarks.filter((bookmark) =>
      this.shouldIncludeBookmark(bookmark, groups),
    );
  }

  private shouldIncludeBookmark(bookmark: Bookmark, groups: string[]): boolean {
    return (
      groups.length === 0 || groups.includes(this.resolveString(bookmark.group))
    );
  }

  private resolveString(alleged: string | undefined): string {
    return alleged || '';
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
