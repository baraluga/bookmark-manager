import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BookmarkCardModule } from '../bookmark-card';
import { BookmarkFormModule } from '../bookmark-form';
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
  ],
  exports: [BookmarkListComponent],
})
export class BookmarkListModule {}
