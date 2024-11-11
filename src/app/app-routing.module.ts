import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { UsersComponent } from "./users/users.component";

// rotas são avaliadas de cima para baixo
// se houver mais de uma combinação, o Angular seleciona a primeira que encontrar
const rotas: Routes = [
  // a rota "" (vazia) sempre será verdadeira, então o
  // pathMatch considera a rota inteira (não pode haver nada após ela)
  // se retirar o pathMatch, entra em loop, sempre mandando para login
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', // rota default (quando não dá match com as outras rotas)
    redirectTo: "login" // quando não coincidir a rota, redireciona pro login
  },
]

@NgModule({
  // indica que a rota será no root da aplicação. Ou seja, as rotas desse
  // arquivo serão avaliadas pelo verificador de rotas do Angular
  imports: [RouterModule.forRoot(rotas)],
  // após adicionarmos nossas rotas no .forRoot(), no imports, exportamos
  // o RouterModule
  exports: [RouterModule]
})
export class AppRoutingModule {}
