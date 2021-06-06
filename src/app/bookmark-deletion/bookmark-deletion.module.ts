import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookmarkDeletionComponent } from './bookmark-deletion.component';

@NgModule({
  declarations: [BookmarkDeletionComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule],
  exports: [BookmarkDeletionComponent],
})
export class BookmarkDeletionModule {}
