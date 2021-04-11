import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class AutBookServisService {

  constructor(private http: HttpClient) { }

  // список всех авторов
  getAutBook() {
    return this.http.get("/api/autBook").pipe(
      map(response => {
        let value = response as [];
        let result = [];
        value.forEach(element => {
          if (!element['styleBooks']) {
            result.push(element);
          }
        });
        return result;
      })
    );;
  }
  // определенный автор
  getAuthor(id) {
    return this.http.get(`/api/autBook/${id}`)
  }
  // список жанров
  getStyleBooks() {
    return this.http.get(`/api/autBook/0`);

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

        let value = res as [];
        let result = [];
        value.forEach(obj => {
          if (obj['id'] !== 0) {
            result.push({ id: obj['id'], book: obj['listBooks'], surname: obj['surname'] });
          }
        });

        return result;
      })
    )
  }
}
