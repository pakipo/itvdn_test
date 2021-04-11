import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import {AuthorListComponent, AuthorComponent, BooksComponent,SearchResultComponent} from './index'

const routes: Routes = [
  {
    path: "",
    redirectTo: "authors",
    pathMatch: "full"
},
{
    path: "authors",
    component: AuthorListComponent
},
{
  path: "author/:id",
  component: AuthorComponent
},
{
  path: ":author/books",
  component:  BooksComponent
},
{
  path: "searchresult",
component:  SearchResultComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
