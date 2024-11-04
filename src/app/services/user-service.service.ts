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
  usersHaveChanged: Subject<void> = new Subject<void>();

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

  getUsers() {
    return this.http.get<User[]>("http://localhost:3000/user/users")
  }

  removeUser(index: number): void {
    this.userList.splice(index, 1);
  }

  editUser(user: User, index: number): void {
    // this.userList[index] = user;
    this.putUser(user).subscribe({
      next: () => {
        alert("The edit was successful!");
        this.usersHaveChanged.next();
      },
      error: (err) => {
        console.log(err);
        alert("The user edit failed! Please try again later.")
      }
    })
  }

  putUser(userForEdit: User) {
    return this.http.put("http://localhost:3000/user/editUser", userForEdit)
  }
}
