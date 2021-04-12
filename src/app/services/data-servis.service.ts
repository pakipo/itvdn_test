import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class DataServisService implements InMemoryDbService {
  styleBooks = ['фантастика', 'приключения', 'детектив']
  constructor() { }

  createDb() {
    let autBook = [
      {
        id: 0,
        styleBooks: this.styleBooks
      },
      {
        id: 1,
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'иванович',
        birthDate: '22.11.1899',
        listBooks: [{
          title: 'Иванов книга 1',
          pageCount: 33,
          style: this.styleBooks[0]
        },
        {
          title: 'Иванов книга 2',
          pageCount: 43,
          style: this.styleBooks[2]
        }],

      },
      {

        id: 2,
        surname: 'Петров',
        name: 'Петр',
        patronymic: 'Петрович',
        birthDate: '21.10.1888',
        listBooks: [{
          title: 'Петров книга 1',
          pageCount: 13,
          style: this.styleBooks[1]
        },
        {
          title: 'Петров книга 2',
          pageCount: 53,
          style: this.styleBooks[2]
        },
        {
          title: 'Петров книга 3',
          pageCount: 63,
          style: this.styleBooks[1]
        }]
      },

      {
        id: 3,
        surname: 'Сергеев',
        name: 'Сергей',
        patronymic: 'Сергеевич',
        birthDate: '12.09.1668',
        listBooks: [{
          title: 'Сергеев книга 1',
          pageCount: 13,
          style: this.styleBooks[0]
        },
        {
          title: 'Сергеев книга 2',
          pageCount: 33,
          style: this.styleBooks[0]
        },
        {
          title: 'Сергеев книга 3',
          pageCount: 100,
          style: this.styleBooks[1]
        }
        ]
      },

    ];


    return { autBook }
  }
}
