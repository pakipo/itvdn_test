import { Component, OnInit } from '@angular/core';
import { AutBookServisService, AutBookObj, Book } from '../index'
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(private servis: AutBookServisService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  // список всех авторов для отображения
  showList: AutBookObj[];
  // отображение  результата поиска
  searchActive: boolean = false;
  // список всех книг для организации поиска
  listBooks: Book[] = [];
  // Название книги введенное в поле поиска
  inpSearch: string;

  // объект найденой книги
  bookSerchObj: Book;

  display: string = 'none';
  // жанры
  styleBooks: string[];
  // содержание р поиска
  bookSerch: string;
  createForm: FormGroup;
  newAuthor: AutBookObj;


  ngOnInit(): void {
    this.servis.getAutBook().subscribe(result => {
      this.showList = result;

    });
    this.styleBooks = this.servis.getStyleBooks();

    this.servis.getListBooks().subscribe(result => {
      this.listBooks = result;
    });

    this.createForm = this.fb.group({
      surname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      patronymic: ['', Validators.pattern('[a-zA-Zа-яА-я]+')],
      birthDate: ['', [Validators.required, Validators.pattern("[0-3][0-9]\.[0-1][0-9]\.[0-2][0-9][0-9][0-9]")]],
      title: ['', [Validators.required]],
      pageCount: ['', Validators.required],
      style: ['', Validators.required]
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
    this.listBooks.map(obj => {
      if (obj.book.title === this.inpSearch) {
        this.bookSerchObj = obj;
        this.bookSerch = obj.book.title;
      }
    });
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
  removeAuthor(id) {

    // если активна подсказка поиска, при первом клике срыть в hideSearch()
    if (!this.searchActive) {
      if (confirm('Вы уверены'))
        this.servis.removeAuthor(id).subscribe();
      this.ngOnInit();
    }

  }
  // форма для создания нового автора

  createAutor() {
    if (!this.searchActive) {

      this.display = 'block';
    }
  }

  apply(form) {

    this.newAuthor = new AutBookObj(this.showList.length,
      form.get('surname').value,
      form.get('name').value,
      form.get('patronymic').value,
      form.get('birthDate').value,
      {
        title: form.get('title').value,
        pageCount: form.get('pageCount').value,
        style: form.get('style').value
      })


    if (form.valid) {
      this.servis.createAuthor(this.newAuthor).subscribe();
    }
    this.display = 'none';
     this.ngOnInit();
  }

  cancel() {
    this.createForm.controls.surname.setValue('');
    this.createForm.controls.name.setValue('');
    this.createForm.controls.patronymic.setValue('');
    this.createForm.controls.birthDate.setValue('');
    this.createForm.controls.title.setValue('');
    this.createForm.controls.pageCount.setValue('');
    this.createForm.controls.style.setValue('');
    this.display = 'none';

  }


}
