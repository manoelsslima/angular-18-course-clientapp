import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// estamos dizendo que essa classe poderá ser importada em outros arquivos
export class UserService {

  colorHasChanged: Subject<string> = new Subject<string>();

  editingUser: string = "";
  editingUserIndex: number = -1;

  userList = [
    'Tucker Anselm',
    'Elmira Keddy',
    'Eveline Grandisson',
    'Berry Wildes',
    'Quintus Hastings',
    'Harp Antonignetti',
    'Vite Playfair',
    'Noelle Dowears',
    'Delcine Lubbock',
    'Auberta Skerrett',
    'Constantin Cosgry',
    'Loleta Grenfell',
    'Nadeen Matchett',
    'Elli Galliver',
    'Gayla Hawtin',
    'Liam Antwis',
    'Merilyn Baumford',
    'Lilas Colquyte',
    'Roi Kinworthy',
    'Patin Flecknoe',
    'Etienne Vedeneev',
    'Diane Evesque',
    'Ashlee Amoore',
    'Julissa Bandey',
    'Merridie McPartling',
    'Nanete Kitlee',
  ];

  removeUser(index: number): void {
    this.userList.splice(index, 1);
  }

  editUser(fullName: string, index: number): void {
    this.userList[index] = fullName;
  }
}
