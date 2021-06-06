import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bookmark, BookmarkGroup } from '../store';

@Component({
  selector: 'bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
})
export class BookmarkCardComponent {
  @Input() data: Bookmark | undefined;

  @Output() edit = new EventEmitter();

  @Output() delete = new EventEmitter();

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {}

  onCopy(): void {
    this.snackbar.open(
      'Bookmark address has been copied to clipboard!',
      undefined,
      {
        duration: 3000,
      },
    );
  }

  onDelete(): void {}
}
