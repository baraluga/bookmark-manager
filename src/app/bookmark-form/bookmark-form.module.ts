import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BookmarkFormComponent } from './bookmark-form.component';

@NgModule({
  declarations: [BookmarkFormComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [BookmarkFormComponent],
})
export class BookmarkFormModule {}
