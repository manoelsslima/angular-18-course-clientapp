import { Component } from '@angular/core';
import { UserService } from './services/user-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ClientApp';
    helloWorld: string = "Hello World";
    clicked: number = 0;

  constructor(
    public userService: UserService
  ) {}

  triggerColorChange() {
    this.userService.colorHasChanged.next(); // dispara o evento do subscribe
  }

    incrementClicked() {
        this.clicked++;
    }
}
