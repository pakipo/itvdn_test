import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AutBookObj, Book } from '../index';
@Injectable({
  providedIn: 'root'
})
export class AutBookServisService {

  constructor(private http: HttpClient) { }

  // список всех авторов
  getAutBook(): Observable<AutBookObj[]> {
    return this.http.get("/api/autBook").pipe(
      map(response => {
        let value = response as AutBookObj[];
        let result: AutBookObj[] = [];
        value.forEach(element => {
          result.push(element);
        });
        return result;
      })
    );
  }
  // определенный автор
  getAuthor(id): Observable<AutBookObj> {
    return this.http.get(`/api/autBook/${id}`).pipe(
      map(res => {
        let author = res as AutBookObj;
        return author
      }
      )
    )
  }
  // список жанров

  getStyleBooks() {
    return AutBookObj.styleBooks;

  }

  // изменить информацию об авторе
  editAuthor(author) {

    return this.http.put(`/api/autBook`, author).pipe(
      map(res => {
        return res
      })
    );

  }
  // все книги базы
  getListBooks() {
    return this.http.get(`/api/autBook`).pipe(
      map(res => {

        let value = res as AutBookObj[];
        let result: Book[] = [];
        value.forEach((obj, index) => {


          if (obj.listBooks) {

            obj.listBooks.map(book => {
              result.push(new Book(index, book, obj['surname'])
              )
            })
          }
        });
        return result;
      })
    )
  }

  removeAuthor(id) {
    return this.http.delete(`/api/autBook/${id}`)
  }
  createAuthor(author) {

    return this.http.post(`/api/autBook`, author)

  }
}
