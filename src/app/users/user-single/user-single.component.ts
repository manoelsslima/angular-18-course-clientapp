import { Component, EventEmitter, input, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css',
})
export class UserSingleComponent implements OnInit, OnDestroy {
    // @Input() user: string = "";
    @Input() userIndex: number = -1;
    @Input() addMode: boolean = false;

    editMode: boolean = false;
    userForEdit: User;

    textColor: any = {
        color: "black"
    }
    colorHasChangedSubscription: Subscription = new Subscription();

    // um output é exposto como um evento e será acessado por (deleteUser)=METODO_XPTO_DO_COMPONENTE_PAI($event)
    // esse $event é o evento que é emitido pelo métood emit()
    // o METODO_XPTO_DO_COMPONENTE_PAI vai receber, via $event, o que foi emitido. No caso, o userIndex.
    // @Output()
    // deleteUser: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        public userService: UserService
    ) {
        this.userForEdit = {...this.userService.emptyUser}
    }

    ngOnInit(): void {
        this.userForEdit = {...this.userService.emptyUser};

        this.colorHasChangedSubscription = this.userService.colorHasChanged.subscribe(
            (newColor) => {
              this.textColor.color = newColor
            }
        )
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
    }
}
