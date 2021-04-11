import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private router: Router,
    private actRoute: ActivatedRoute) { }
  book;
  id;

  ngOnInit(): void {
    this.actRoute.params.subscribe(par => {
      this.id = par['id'];

      this.book = {
        title: par['title'],
        pageCount: par['pageCount'],
        style: par['style'],
        surname: par['surname']
      };

    });

  }
  goMain() { this.router.navigate(['authors']) }
  goAuthor() { this.router.navigate([`author/${this.id}`]) }
  goBooks() { this.router.navigate([`${this.book.surname}/books`]) }
}
