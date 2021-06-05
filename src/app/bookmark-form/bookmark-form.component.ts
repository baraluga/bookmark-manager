import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Bookmark, BookmarkGroup } from '../store';
import { FormMode } from './bookmark-form.models';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent {
  readonly bookmarkForm;
  readonly mode: FormMode;
  readonly bookmarkGroups: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Partial<Bookmark>,
    private dialogRef: MatDialogRef<BookmarkFormComponent, Partial<Bookmark>>
  ) {
    this.bookmarkForm = this.createBookmarkForm(data);
    this.mode = this.resolveMode(data);
    this.bookmarkGroups = Object.values(BookmarkGroup);
  }

  onAddOrEdit(): void {
    if (this.bookmarkForm.valid) {
      this.dialogRef.close(this.bookmarkForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private resolveMode(data: Partial<Bookmark>): FormMode {
    return this.isObjectEmpty(data) ? FormMode.ADD : FormMode.EDIT;
  }

  private isObjectEmpty<T>(object: T): boolean {
    return Object.keys(object).length === 0;
  }

  private createBookmarkForm(
    initial: Partial<Bookmark>
  ): FormGroup<Partial<Bookmark>> {
    const { name, group, url } = initial;
    return new FormGroup<Partial<Bookmark>>({
      name: new FormControl(name, [Validators.required]),
      url: new FormControl(url, [Validators.required]),
      group: new FormControl(group),
    });
  }
}
