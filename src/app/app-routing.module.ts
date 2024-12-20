import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { UsersComponent } from "./users/users.component";
import { UserSingleComponent } from "./users/user-single/user-single.component";

// rotas são avaliadas de cima para baixo
// se houver mais de uma combinação, o Angular seleciona a primeira que encontrar
const rotas: Routes = [
  // a rota "" (vazia) sempre será verdadeira, então o
  // pathMatch considera a rota inteira (não pode haver nada após ela)
  // se retirar o pathMatch, entra em loop, sempre mandando para login
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'user', children: [
    // patchMatch faz o Angular ignorar o path /user se houver algo após ele.
    // se não tiver, por exemplo, a rota /user sobreporia a /user/:userId
    // porque o Angular iria entender que /user é uma rota válida
    // e navegaria para /user
    { path: '', component: UsersComponent, pathMatch: "full" }, // herda o /user da rota-mãe
    { path: ':userId', component: UserSingleComponent }, // herda o user/:userId da rota-mãe
  ] },
  { path: '**', // rota default (quando não dá match com as outras rotas)
    redirectTo: "login" // quando não coincidir a rota, redireciona pro login
  },
]

@NgModule({
  // indica que a rota será no root da aplicação. Ou seja, as rotas desse
  // arquivo serão avaliadas pelo verificador de rotas do Angular
  imports: [RouterModule.forRoot(rotas, {
    scrollPositionRestoration: "disabled"
  })],
  // após adicionarmos nossas rotas no .forRoot(), no imports, exportamos
  // o RouterModule
  exports: [RouterModule]
})
export class AppRoutingModule {}
