import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Bookmark } from '../store';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent {
  readonly bookmarkForm;

  constructor() {
    this.bookmarkForm = this.createBookmarkForm({});
  }

  private createBookmarkForm(
    initial: Partial<Bookmark>
  ): FormGroup<Partial<Bookmark>> {
    const { name, tags, url } = initial;
    return new FormGroup<Partial<Bookmark>>({
      name: new FormControl(name, [Validators.required]),
      url: new FormControl(url, [Validators.required]),
      tags: new FormControl(tags),
    });
  }
}
