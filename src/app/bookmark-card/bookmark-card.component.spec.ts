import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkCardComponent } from './bookmark-card.component';

describe('BookmarkCardComponent', () => {
  let component: BookmarkCardComponent;
  let snacky: MatSnackBar;

  beforeEach(() => {
    snacky = mockSnackbar();
    component = new BookmarkCardComponent(snacky, mockDialog());
  });

  it('should open a snacky on copy', () => {
    const spy = spyOn(snacky, 'open');
    component.onCopy();
    expect(spy).toHaveBeenCalledWith(
      'Bookmark address has been copied to clipboard!',
      undefined,
      { duration: 3000 },
    );
  });
});

const mockSnackbar = () => ({ open: (_) => {} } as MatSnackBar);
const mockDialog = () => ({ open: (_: unknown) => {} } as MatDialog);
