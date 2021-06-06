import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookmarkCardComponent } from './bookmark-card.component';

@NgModule({
  declarations: [BookmarkCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [BookmarkCardComponent],
})
export class BookmarkCardModule {}
