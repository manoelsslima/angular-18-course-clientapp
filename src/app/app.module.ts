import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
//    HttpClientModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
