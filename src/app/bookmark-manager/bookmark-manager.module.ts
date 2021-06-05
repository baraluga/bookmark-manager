import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookmarkManagerComponent } from './bookmark-manager.component';

@NgModule({
  declarations: [BookmarkManagerComponent],
  imports: [CommonModule],
  exports: [BookmarkManagerComponent],
})
export class BookmarkManagerModule {}
