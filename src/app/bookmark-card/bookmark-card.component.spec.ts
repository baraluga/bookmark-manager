import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookmarkCardComponent } from './bookmark-card.component';
import { BookmarkCardService } from './bookmark-card.service';

describe('BookmarkCardComponent', () => {
  let component: BookmarkCardComponent;
  let snacky: MatSnackBar;
  let service: BookmarkCardService;

  beforeEach(() => {
    snacky = mockSnackbar();
    service = mockService();
    component = new BookmarkCardComponent(snacky, service);
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

  it('should provide the linkPreview via its service', (done) => {
    component.linkPreview$.pipe(take(1)).subscribe((preview) => {
      expect(preview.description).toEqual('description');
      done();
    });
    component.data = { id: '', name: '', url: '' };
  });
});

const mockSnackbar = () => ({ open: (_) => {} } as MatSnackBar);
const mockService = () =>
  ({
    getLinkPreview: (_) =>
      of({ url: '', description: 'description', image: '', title: '' }),
  } as BookmarkCardService);
