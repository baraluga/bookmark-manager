import { BookmarkFormComponent } from './bookmark-form.component';

describe('BookmarkFormComponent', () => {
  let component: BookmarkFormComponent;

  beforeEach(() => {
    component = new BookmarkFormComponent();
  });

  it('should be initialized well!', () => {
    expect(component).toBeTruthy();
  });
});
