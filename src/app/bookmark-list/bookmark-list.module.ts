import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BookmarkCardModule } from '../bookmark-card';
import { BookmarkDeletionModule } from '../bookmark-deletion';
import { BookmarkFormModule } from '../bookmark-form';
import { InputChipsModule } from '../input-chips';
import { BookmarkListComponent } from './bookmark-list.component';

@NgModule({
  declarations: [BookmarkListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    BookmarkFormModule,
    BookmarkCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    InputChipsModule,
    BookmarkDeletionModule,
  ],
  exports: [BookmarkListComponent],
})
export class BookmarkListModule {}
