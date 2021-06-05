import { MatDialogRef } from '@angular/material/dialog';
import { Bookmark, BookmarkGroup } from '../store';
import { BookmarkFormComponent } from './bookmark-form.component';
import { FormMode } from './bookmark-form.models';

describe('BookmarkFormComponent', () => {
  let component: BookmarkFormComponent;
  let dialogRef: MatDialogRef<BookmarkFormComponent>;
  let closeSpy: jasmine.Spy;

  beforeEach(() => {
    dialogRef = mockDialogRef();
    closeSpy = spyOn(dialogRef, 'close');
    component = new BookmarkFormComponent(mockBookmark(), dialogRef);
  });

  describe('On initializing the bookmark form...', () => {
    it('should do so if an instance of bookmark is specified in constructor', () => {
      component = new BookmarkFormComponent(mockBookmark(), dialogRef);
      const bookmarkForm = component.bookmarkForm.value;
      expect(bookmarkForm.name).toEqual('baraluga');
      expect(bookmarkForm.url).toEqual('hornpub.com');
    });

    it('should not do so if no instance of bookmark is specified in construcotr', () => {
      component = new BookmarkFormComponent({}, dialogRef);
      const bookmarkForm = component.bookmarkForm.value;
      expect(bookmarkForm.name).toBeFalsy();
    });
  });

  describe('On initializing the form mode...', () => {
    it('should set to EDIT mode if an instance of bookmark is provided', () => {
      component = new BookmarkFormComponent(mockBookmark(), dialogRef);
      expect(component.mode).toEqual(FormMode.EDIT);
    });
    it('should set to ADD mode if no instance of bookmark is provided', () => {
      component = new BookmarkFormComponent({}, dialogRef);
      expect(component.mode).toEqual(FormMode.ADD);
    });
  });

  it('should close the dialogRef with an empty emission', () => {
    component.onCancel();
    expect(closeSpy).toHaveBeenCalledWith();
  });

  describe('On confirming the bookmarkForm transaction...', () => {
    it('should close the dialogRef with the value if form is valid', () => {
      component.onAddOrEdit();
      expect(closeSpy).toHaveBeenCalledWith(component.bookmarkForm.value);
    });

    it('should not close the dialogRef if form is invalid', () => {
      component.bookmarkForm.patchValue({ name: '' });
      component.onAddOrEdit();
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  it('should initialize all possible bookmark groups', () => {
    expect(component.bookmarkGroups.length).toEqual(
      Object.values(BookmarkGroup).length
    );
  });
});

const mockBookmark = () =>
  ({ id: '1', name: 'baraluga', url: 'hornpub.com' } as Bookmark);
const mockDialogRef = () =>
  ({
    close: (_) => {},
  } as MatDialogRef<BookmarkFormComponent>);
