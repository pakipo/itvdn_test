import { Component, OnInit } from '@angular/core';
import { AutBookServisService } from '../index'
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(private servis: AutBookServisService,
    private router: Router,
  ) { }
  showList;

  // отображение  результата поиска
  searchActive: boolean = false;
  listBooks = [];
  inpSearch;
  searchResult;
  bookSerchObj;

  // содержание р поиска
  bookSerch;
  ngOnInit(): void {
    this.servis.getAutBook().subscribe(result => this.showList = result);
    this.servis.getListBooks().subscribe(result => {
      this.listBooks = result;

    });

  }
  // перейти к автору
  goAuthor(id) {
    // если активна подсказка поиска, при первом клике срыть в hideSearch()
    if (!this.searchActive) { this.router.navigate(['author', id]); }
  }

  // поиск по названию книги
  search() {
    this.bookSerchObj = undefined;
    this.listBooks.map(obj =>
      obj.book.map(book => {
        if (book.title === this.inpSearch) {

          this.bookSerchObj = { id: obj['id'], book: book, surname: obj.surname }
          this.bookSerch = book.title;
        }
      }));
    this.searchActive = true;
    if (!this.bookSerchObj) {
      this.bookSerch = 'Ничего не найдено'
    }
  }

  // если книга найдена перейти к книге
  goBook() {
    if (this.bookSerchObj) {

      this.router.navigate(['searchresult', { title: this.bookSerchObj.book['title'], pageCount: this.bookSerchObj.book['pageCount'], style: this.bookSerchObj.book['style'], id: this.bookSerchObj['id'], surname: this.bookSerchObj['surname'] }]);
      this.searchActive = false;
    }
  }

  // если активна подсказка поиска, при первом клике срыть
  hideSearch(event) {

    if (this.searchActive && event.target.localName !== 'p' && event.target.localName !== 'button') {
      this.searchActive = false;
    }
  }
}
