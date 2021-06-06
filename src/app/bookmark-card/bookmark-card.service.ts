import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BookmarkCardService {
  private readonly LINK_PREVIEW_API_KEY = '063763bbf027323cd5d7e19dfdfe0101';

  constructor(private http: HttpClient) {}

  getLinkPreview(url: string): Observable<LinkPreviewResponse> {
    return this.http.get<LinkPreviewResponse>(
      this.buildLinkPreviewRequestUrl(url),
    );
  }

  private buildLinkPreviewRequestUrl(queryUrl: string): string {
    return `https://api.linkpreview.net/?key=${this.LINK_PREVIEW_API_KEY}&q=${queryUrl}`;
  }
}

export interface LinkPreviewResponse {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly url: string;
}
