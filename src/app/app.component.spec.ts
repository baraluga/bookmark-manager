import { AppComponent } from './app.component';

describe('AppCompponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should be instantiated successfully!', () => {
    expect(component).toBeTruthy();
  });
});
