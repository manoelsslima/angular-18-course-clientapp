import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrl: './user-single.component.css',
})
export class UserSingleComponent {
    // @Input() user: string = "";
    @Input()
    userIndex: number = -1;

    // um output é exposto como um evento e será acessado por (deleteUser)=METODO_XPTO_DO_COMPONENTE_PAI($event)
    // esse $event é o evento que é emitido pelo métood emit()
    // o METODO_XPTO_DO_COMPONENTE_PAI vai receber, via $event, o que foi emitido. No caso, o userIndex.
    // @Output()
    // deleteUser: EventEmitter<number> = new EventEmitter<number>();

    constructor(
      public userService: UserService
    ) {}

    // remover(): void {
    //   this.deleteUser.emit(this.userIndex);
    // }
}
