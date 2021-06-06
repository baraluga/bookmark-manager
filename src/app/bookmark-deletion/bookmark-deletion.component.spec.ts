import { MatDialogRef } from '@angular/material/dialog';
import { BookmarkDeletionComponent } from './bookmark-deletion.component';

describe('BookmarkDeletionComponent', () => {
  let component: BookmarkDeletionComponent;
  let dialogCloseSpy: jasmine.Spy;

  beforeEach(() => {
    const dialogRef = mockDialogRef();
    component = new BookmarkDeletionComponent('', dialogRef);
    dialogCloseSpy = spyOn(dialogRef, 'close');
  });

  it('should close without emission on cancel', () => {
    component.onCancel();
    expect(dialogCloseSpy).toHaveBeenCalledOnceWith();
  });

  it('should close with true emissions', () => {
    component.onConfirm();
    expect(dialogCloseSpy).toHaveBeenCalledWith(true);
  });
});

const mockDialogRef = () =>
  ({ close: () => {} } as MatDialogRef<BookmarkDeletionComponent, boolean>);
