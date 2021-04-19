import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { Book } from '../index';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private router: Router,
    private actRoute: ActivatedRoute) { }
  book: Book;
  id: number;

  ngOnInit(): void {
    this.actRoute.params.subscribe(par => {
      this.id = par['id'];

      this.book = new Book(this.id,{
        title: par['title'],
        pageCount: par['pageCount'],
        style: par['style'] },
        par['surname']
     )
    });

  }
  goMain() { this.router.navigate(['authors']) }
  goAuthor() { this.router.navigate([`author/${this.id}`]) }
  goBooks() { this.router.navigate([`${this.book.surname}`,'books', { id: this.id }]) }
}
