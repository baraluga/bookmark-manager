import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bookmark-deletion',
  templateUrl: './bookmark-deletion.component.html',
  styleUrls: ['./bookmark-deletion.component.scss'],
})
export class BookmarkDeletionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public name: string,
    private dialogRef: MatDialogRef<BookmarkDeletionComponent, boolean>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
