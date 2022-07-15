import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  skip,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchTerm: FormControl = new FormControl();

  public books$: Observable<Array<any>> = of([{}]);

  constructor(private service: AppService) {
    this.getBooks();
  }

  private getBooks(): void {
    this.books$ = this.searchTerm.valueChanges.pipe(
      filter((searchText) => searchText.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) => {
        return this.service.searchABook(searchText).pipe(
          takeUntil(
            this.searchTerm.valueChanges.pipe(
              tap((value) => {
                console.log(value);
              }),
              skip(1)
            )
          )
        );
      })
    );
  }
}
