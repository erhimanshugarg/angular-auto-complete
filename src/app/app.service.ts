import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private url: string;

  /**
   * Constructor
   *
   * @param httpClient HttpClient
   */
  constructor(private httpClient: HttpClient) {
    this.url = 'https://www.googleapis.com/books/v1/volumes?q=';
  }

  /**
   * Call the api to search the result matching the keyword
   *
   * @param term keyword
   * @returns Observable<any>
   */
  public searchABook(term: string): Observable<any> {
    return this.httpClient.get<Array<any>>(`${this.url}${term}`).pipe(
      take(10),
      map((d: any) => d.items)
    );
  }
}
