import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookmarkCardService } from './bookmark-card.service';

describe('BookmarkCardService', () => {
  let service: BookmarkCardService;
  let http: HttpClient;

  beforeEach(() => {
    http = mockHttp();
    service = new BookmarkCardService(http);
  });

  it('should make a request to linkPreviewAPI with the correct query params', (done) => {
    testSubject.pipe(take(1)).subscribe((url) => {
      expect(url.includes('https://api.linkpreview.net')).toBeTruthy();
      expect(url.includes('mom')).toBeTruthy();
      done();
    });

    service.getLinkPreview('mom');
  });
});

const testSubject = new Subject<string>();
const mockHttp = () =>
  ({ get: (_: string) => testSubject.next(_) } as HttpClient);
