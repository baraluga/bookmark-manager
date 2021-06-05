import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { bookmarksReducer, BOOKMARKS_STATE_KEY } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ [BOOKMARKS_STATE_KEY]: bookmarksReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
