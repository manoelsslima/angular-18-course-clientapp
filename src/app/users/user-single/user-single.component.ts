import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css',
})
export class UserSingleComponent implements OnInit {
    // @Input() user: string = "";
    @Input()
    userIndex: number = -1;

    editMode: boolean = false;
    userForEdit: string = "";
    textColor: any = {
        color: "white"
    }

    // um output é exposto como um evento e será acessado por (deleteUser)=METODO_XPTO_DO_COMPONENTE_PAI($event)
    // esse $event é o evento que é emitido pelo métood emit()
    // o METODO_XPTO_DO_COMPONENTE_PAI vai receber, via $event, o que foi emitido. No caso, o userIndex.
    // @Output()
    // deleteUser: EventEmitter<number> = new EventEmitter<number>();

    constructor(
      public userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.colorHasChanged.subscribe(
            () => {
              this.textColor.color = "purple"
            }
        )
    }

    toggleEdit(editMode: boolean, user: string = "") {
      this.editMode = editMode;
      this.userForEdit = user;
    }

    submitEdit() {
      // desnecessário, pois é setado para false quando o Angular detecta a mudança e
      // recarrega o componente
      this.editMode = false;
      this.userService.editUser(this.userForEdit, this.userIndex);
    }

    // remover(): void {
    //   this.deleteUser.emit(this.userIndex);
    // }
}
