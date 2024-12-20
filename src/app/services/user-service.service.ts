import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
// estamos dizendo que essa classe poderá ser importada em outros arquivos
export class UserService {

  colorHasChanged: Subject<string> = new Subject<string>();
  usersHaveChanged: Subject<boolean> = new Subject<boolean>();

  editingUser: string = "";
  editingUserIndex: number = -1;

  userList: User[] = [];

  emptyUser: User = {
    userId: 0,
    username: '',
    fullName: '',
    city: '',
    gender: '',
    favoriteColor: '',
    favoriteAnimal: ''
  };

  // userList = [
  //   'Tucker Anselm',
  //   'Elmira Keddy',
  //   'Eveline Grandisson',
  //   'Berry Wildes',
  //   'Quintus Hastings',
  //   'Harp Antonignetti',
  //   'Vite Playfair',
  //   'Noelle Dowears',
  //   'Delcine Lubbock',
  //   'Auberta Skerrett',
  //   'Constantin Cosgry',
  //   'Loleta Grenfell',
  //   'Nadeen Matchett',
  //   'Elli Galliver',
  //   'Gayla Hawtin',
  //   'Liam Antwis',
  //   'Merilyn Baumford',
  //   'Lilas Colquyte',
  //   'Roi Kinworthy',
  //   'Patin Flecknoe',
  //   'Etienne Vedeneev',
  //   'Diane Evesque',
  //   'Ashlee Amoore',
  //   'Julissa Bandey',
  //   'Merridie McPartling',
  //   'Nanete Kitlee',
  // ];

  constructor(
    private http: HttpClient
  ) {}

  getUsers(searchText: string = "") {
    if (searchText === "") {
      return this.http.get<User[]>("http://localhost:3000/user/users")
    } else {
      return this.http.get<User[]>("http://localhost:3000/user/userSearch/" + searchText);
    }
  }

  getSingleUser(userId: number) {
    return this.http.get<User>("http://localhost:3000/user/userSingle/" + userId);
  }

  removeUser(userId: number): void {
    // this.userList.splice(index, 1);
    if(confirm("Are you sure you want to delete this user?")) {
      this.deleteUser(userId).subscribe({
        next: () => {
          alert("The delete was successful!");
          this.usersHaveChanged.next(false);
        },
        error: (err) => {
          alert("The user delete failed! Please try again later.")
        }
      })
    }
  }

  addUser(user: User): void {
    this.postUser(user).subscribe({
      next: () => {
        alert("Adding a user was successful!");
        this.usersHaveChanged.next(false);
      },
      error: (err) => {
        console.log(err);
        alert("Adding the user failed! Please try again later.")
      }
    })
  }

  editUser(user: User): void {
    this.putUser(user).subscribe({
      next: () => {
        alert("The edit was successful!");
        this.usersHaveChanged.next(false);
      },
      error: (err) => {
        console.log(err);
        alert("The user edit failed! Please try again later.")
      }
    })
  }

  postUser(userForAdd: User) {
    console.log(userForAdd);
    return this.http.post("http://localhost:3000/user/addUser", userForAdd);
  }

  putUser(userForEdit: User) {
    console.log(userForEdit);
    return this.http.put("http://localhost:3000/user/editUser", userForEdit);
  }

  deleteUser(userId: number) {
    return this.http.delete("http://localhost:3000/user/deleteUser/" + userId);
  }
}
