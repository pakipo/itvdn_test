import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { AutBookServisService } from '../index';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private router: Router,
    private servis: AutBookServisService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder) { }
  editBooksForm: FormGroup;
  authorObj;
  styleBooks;
  listBooks;
  id;
  display;
  indexEditBook;
  buttonDisablad = false;
  // флаг для использования одной формы для создания и редактирования книг.
  formFlag: boolean;

  ngOnInit(): void {
    this.display = 'none';
    this.actRoute.params.subscribe(par => { this.id = par['id'] });
    this.servis.getAuthor(this.id).subscribe(result => {
      this.authorObj = result;
      this.listBooks = this.authorObj['listBooks']
    });
    this.servis.getStyleBooks().subscribe(result => {
      this.styleBooks = result['styleBooks']
    });

    this.editBooksForm = this.fb.group({
      title: ['', [Validators.required]],
      pageCount: ['', Validators.required],
      style: ['']

    });
  }

  //Навигация

  // На главную
  goMain() {
    this.router.navigate(['authors']);
  }

  // К автору
  goAuthor() {
    this.router.navigate(['author', this.id]);
  }

  // Форма для редактировани
  // Активировать форму
  editBook(book) {
    this.formFlag = true;
    this.buttonDisablad = true;
    this.display = 'block';
    this.editBooksForm.setValue({
      title: book.title,
      pageCount: book.pageCount,
      style: book.style
    });
    this.indexEditBook = this.listBooks.findIndex((el) => el.title === book.title);
  }

  cancel() {
    this.display = 'none';
    this.buttonDisablad = false;
  }

  apply(form) {
    // редактирование книги
    if (this.formFlag) {
      this.authorObj.listBooks[this.indexEditBook] = {
        title: form.get('title').value,
        pageCount: form.get('pageCount').value,
        style: form.get('style').value
      }
      this.display = 'none';
      this.buttonDisablad = false;
      this.servis.editAuthor(this.authorObj).subscribe(result => {
        this.authorObj = result;
      });
      this.ngOnInit();

      // добавить новую книгу
    } else {
      this.authorObj.listBooks.push({
        title: form.get('title').value,
        pageCount: form.get('pageCount').value,
        style: form.get('style').value
      });
      this.display = 'none';
      this.buttonDisablad = false;
      this.servis.editAuthor(this.authorObj).subscribe(result => {
        this.authorObj = result;
      });
      this.ngOnInit();
    }
  }

  // Форма для добавления книг
  createBook() {
    this.formFlag = false;
    this.buttonDisablad = true;
    this.display = 'block';
    this.editBooksForm.setValue({
      title: '',
      pageCount: '',
      style: this.styleBooks[0]
    })
  }

  //  удалить книгу
  remove(book) {
    if (confirm('Вы уверены?')) {
      this.indexEditBook = this.listBooks.findIndex((el) => el.title === book.title);
      this.listBooks.splice(this.indexEditBook, 1);
      this.authorObj.listBooks = this.listBooks;
      this.display = 'none';
      this.buttonDisablad = false;
      this.servis.editAuthor(this.authorObj).subscribe(result => {
        this.authorObj = result;
      });
      this.ngOnInit();

    } else {
      this.display = 'none';
      this.buttonDisablad = false;
    }
  }

}
