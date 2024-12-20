import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User.model';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

    usersHaveChangedSubscription: Subscription = new Subscription();
    addingNewUser: boolean = false;
    userSearch: string = "";

    // userList = [
    //     "Tucker Anselm",
    //     "Elmira Keddy",
    //     "Eveline Grandisson",
    //     "Berry Wildes",
    //     "Quintus Hastings",
    //     "Harp Antonignetti",
    //     "Vite Playfair",
    //     "Noelle Dowears",
    //     "Delcine Lubbock",
    //     "Auberta Skerrett",
    //     "Constantin Cosgry",
    //     "Loleta Grenfell",
    //     "Nadeen Matchett",
    //     "Elli Galliver",
    //     "Gayla Hawtin",
    //     "Liam Antwis",
    //     "Merilyn Baumford",
    //     "Lilas Colquyte",
    //     "Roi Kinworthy",
    //     "Patin Flecknoe",
    //     "Etienne Vedeneev",
    //     "Diane Evesque",
    //     "Ashlee Amoore",
    //     "Julissa Bandey",
    //     "Merridie McPartling",
    //     "Nanete Kitlee"
    // ];

    constructor(
      public userService: UserService
    ) {}

    ngOnInit(): void {
        this.getUsers();
        this.usersHaveChangedSubscription = this.userService.usersHaveChanged
            .subscribe((changesCancelled: boolean) => {
                if (!changesCancelled) {
                  this.getUsers();
                }
                this.addingNewUser = false;
            });
    }

    addNewUser() {
        this.addingNewUser = true;
    }

    // removeUser(index: number): void {
    //     this.userService.userList.splice(index, 1);
    // }

    getUsers() {
      let responseObject: Partial<Observer<User[]>> = {
          // successful request
          next: (res: User[]) => {
              // res.forEach((row: User) => {
              //     console.log(row.fullName  + " " + row.city);
              // })
              this.userService.userList = res;
          },
          // error on request
          error: (err: HttpErrorResponse) => {
              console.log(err);
          }
      }
      if (!this.userSearch) {
        this.userService.getUsers().subscribe(responseObject);
      } else {
        this.userService.getUsers(this.userSearch).subscribe(responseObject);
      }
    }

    ngOnDestroy(): void {
        this.usersHaveChangedSubscription.unsubscribe();
    }
}
