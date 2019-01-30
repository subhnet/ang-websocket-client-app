import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { LoginBoxComponent } from './login-box/login-box.component';

const routes: Routes = [
  { path: 'login-page', component: LoginBoxComponent },
  { path: 'chat-page', component: ChatBoxComponent },
  { path: '',
    redirectTo: '/login-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
