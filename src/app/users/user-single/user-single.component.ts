import { Component, EventEmitter, input, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/User.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css',
})
export class UserSingleComponent implements OnInit, OnDestroy {
    // @Input() user: string = "";
    @Input() userIndex: number = -1;
    @Input() addMode: boolean = false;
    userId: number = -1;

    editMode: boolean = false;
    displayUser: boolean = false;
    userForEdit: User;
    userForDisplay: User;

    textColor: any = {
        color: "black"
    }
    colorHasChangedSubscription: Subscription = new Subscription();
    usersHaveChangedSubscription: Subscription = new Subscription();

    // um output é exposto como um evento e será acessado por (deleteUser)=METODO_XPTO_DO_COMPONENTE_PAI($event)
    // esse $event é o evento que é emitido pelo métood emit()
    // o METODO_XPTO_DO_COMPONENTE_PAI vai receber, via $event, o que foi emitido. No caso, o userIndex.
    // @Output()
    // deleteUser: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        public userService: UserService,
        private route: ActivatedRoute
    ) {
        this.userForEdit = {...this.userService.emptyUser}
        this.userForDisplay = {...this.userService.emptyUser};
    }

    ngOnInit(): void {
        this.userForEdit = {...this.userService.emptyUser};

        this.colorHasChangedSubscription = this.userService.colorHasChanged.subscribe(
            (newColor) => {
              this.textColor.color = newColor
            }
        )
        this.subscribeParams();
        this.setUserForDisplay();
    }

    setUserForDisplay() {
      if (this.userIndex !== -1) {
        this.userForDisplay = this.userService.userList[this.userIndex];
        this.displayUser = true;
      }
    }

    subscribeParams() {
      this.route.params.subscribe(params => {
        console.log(params["userId"]);
        if (params["userId"]) {
          // + converts userId from string to number
          this.userId = +params["userId"];
          this.getUserById();
          this.usersHaveChangedSubscription = this.userService.usersHaveChanged.subscribe(() => {
            this.getUserById();
          })
        }
      });
    }

    getUserById() {
      if (this.userId > 0) {
        this.userService.getSingleUser(this.userId).subscribe({
          next: (res) => {
            if (res) {
              this.userForDisplay = res;
              this.displayUser = true;
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }

    toggleEdit(editMode: boolean, user: User = {...this.userService.emptyUser}) {
      this.editMode = editMode;
      this.userForEdit = {...user}; // cloning user
      if (!editMode) {
        this.userService.usersHaveChanged.next(true);
      }
    }

    submitEdit() {
      if (this.addMode) {
        this.userService.addUser(this.userForEdit);
      } else {
        // desnecessário, pois é setado para false quando o Angular detecta a mudança e
        // recarrega o componente
        this.editMode = false;
        this.userService.editUser(this.userForEdit);
      }
    }

    // remover(): void {
    //   this.deleteUser.emit(this.userIndex);
    // }

    ngOnDestroy(): void {
        this.colorHasChangedSubscription.unsubscribe();
        this.usersHaveChangedSubscription.unsubscribe();
    }
}
