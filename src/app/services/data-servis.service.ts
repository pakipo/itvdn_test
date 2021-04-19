import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AutBookObj } from '../index';


@Injectable({
  providedIn: 'root'
})
export class DataServisService implements InMemoryDbService {
 
  constructor() { }

  createDb() {
    let autBook: AutBookObj[] = [
      new AutBookObj(0,'Иванов','Иван','Иванович','22.11.1899',{ title:"Иванов книга 1" , pageCount:33,style:2},{ title:"Иванов книга 2" , pageCount:43,style:1}),

      new AutBookObj(1,'Петров','Петр','Петрович','21.10.1888',{ title:"Петров книга 1" , pageCount:553,style:1},{ title:"Петров книга 2" , pageCount:113,style:0},{ title:"Петров книга 3" , pageCount:66,style:1}),

      new AutBookObj(2,'Сергеев','Сергей','Сергеевич','22.11.1899',{ title:"Сергеев книга 1" , pageCount:88,style:1},{ title:"Сергеев книга 2" , pageCount:43,style:1},{ title:"Петров книга 3" , pageCount:76,style:0})
    ];
    
    return { autBook }
  }
}
