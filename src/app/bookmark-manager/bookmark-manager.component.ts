import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarksStoreService } from '../store';
import { Bookmark } from '../store/bookmark-manager.models';

@Component({
  selector: 'app-bookmark-manager',
  templateUrl: './bookmark-manager.component.html',
  styleUrls: ['./bookmark-manager.component.scss'],
  providers: [BookmarksStoreService],
})
export class BookmarkManagerComponent {
  bookmarks$: Observable<Bookmark[]>;

  constructor(private bookmarks: BookmarksStoreService) {
    this.bookmarks$ = bookmarks.bookmarkList$;
  }

  onAddBookmark(): void {}

  onEditBookmark(id: string): void {}

  onDeleteBookmark(id: string): void {
    this.bookmarks.deleteBookmark(id);
  }
}
