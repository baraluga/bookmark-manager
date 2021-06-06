import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { Bookmark } from '../store';
import {
  BookmarkCardService,
  LinkPreviewResponse,
} from './bookmark-card.service';

@Component({
  selector: 'bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
  providers: [BookmarkCardService],
})
export class BookmarkCardComponent {
  private dataSubject = new BehaviorSubject<Bookmark | undefined>(undefined);

  readonly linkPreview$: Observable<LinkPreviewResponse>;

  @Input() set data(data: Bookmark | undefined) {
    this.dataSubject.next(data);
  }

  get data(): Bookmark | undefined {
    return this.dataSubject.value;
  }

  @Output() edit = new EventEmitter();

  @Output() delete = new EventEmitter();

  constructor(
    private snackbar: MatSnackBar,
    private service: BookmarkCardService,
  ) {
    this.linkPreview$ = this.getPreviewStream();
  }

  onCopy(): void {
    this.snackbar.open(
      'Bookmark address has been copied to clipboard!',
      undefined,
      {
        duration: 3000,
      },
    );
  }

  private getPreviewStream(): Observable<LinkPreviewResponse> {
    return this.dataSubject.pipe(
      filter((data) => !!data),
      mergeMap((data) => this.service.getLinkPreview(data?.url || '')),
    );
  }
}
