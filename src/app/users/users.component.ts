import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

    usersHaveChangedSubscription: Subscription = new Subscription();

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
        this.usersHaveChangedSubscription = this.userService.usersHaveChanged.subscribe(() => {
            this.getUsers();
        });
    }

    // removeUser(index: number): void {
    //     this.userService.userList.splice(index, 1);
    // }

    getUsers() {
        this.userService.getUsers().subscribe({
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
        })
    }

    ngOnDestroy(): void {
        this.usersHaveChangedSubscription.unsubscribe();
    }
}
