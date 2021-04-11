import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{DataServisService, AutBookServisService} from './index'
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorComponent } from './author/author.component';
import { BooksComponent } from './books/books.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    AuthorComponent,
    BooksComponent,
    SearchResultComponent,
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(DataServisService),
    ReactiveFormsModule
  ],
  providers: [AutBookServisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
