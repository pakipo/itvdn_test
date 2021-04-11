import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { AutBookServisService } from '../index'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  editForm: FormGroup;
  author;
  id;
  display = 'none';
  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private servis: AutBookServisService,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    //  инф. о выбранном авторе 

    this.actRoute.params.subscribe(par => this.id = par['id']);
    this.servis.getAuthor(this.id).subscribe(result => {
      this.author = result;

      // форма для редактирования
      this.editForm = this.fb.group({
        surname: [this.author.surname, [Validators.required, Validators.minLength(3)]],
        name: [this.author.name, [Validators.required, Validators.minLength(3)]],
        patronymic: [this.author.patronymic, Validators.pattern('[a-zA-Zа-яА-я]+')],
        birthDate: [this.author.birthDate, [Validators.required, Validators.pattern("[0-3][0-9]\.[0-1][0-9]\.[0-2][0-9][0-9][0-9]")]]
      });

    });

    // [1-3][1-9]\.[0-1][0-2]\.[0-2][0-9][0-9][0-9]

  }
  //переход на главную
  goMain() {
    this.router.navigate(['authors']);
  }
  // переход к книгам автора
  goBooks() {
    this.router.navigate([this.author['surname'], 'books', { id: this.id }]);
  }
  // форма для редаетирования инф. об авторе
  // отобразить форму
  edit() {
    this.display = 'block';
  }

  cancel() {
    this.display = 'none';
  }
  //  применить изменение инф.
  apply() {

    this.author.surname = this.editForm.get('surname').value;
    this.author.name = this.editForm.get('name').value;
    this.author.patronymic = this.editForm.get('patronymic').value;
    this.author.birthDate = this.editForm.get('birthDate').value;
    this.author
    this.servis.editAuthor(this.author).subscribe(result => {
      this.author = result;
    })
    this.display = 'none';
    this.ngOnInit();

  }


}
