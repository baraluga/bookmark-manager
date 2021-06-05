import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookmarkCardComponent } from './bookmark-card.component';

@NgModule({
  declarations: [BookmarkCardComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatButtonModule],
  exports: [BookmarkCardComponent],
})
export class BookmarkCardModule {}
