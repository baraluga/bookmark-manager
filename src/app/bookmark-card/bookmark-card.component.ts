import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from '../store';

@Component({
  selector: 'bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
})
export class BookmarkCardComponent {
  @Input() data: Partial<Bookmark> = {};

  @Output() edit = new EventEmitter();

  @Output() delete = new EventEmitter();
}
