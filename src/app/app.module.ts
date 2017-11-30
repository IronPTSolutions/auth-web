import { resolve } from 'Q';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { UsersService } from './shared/services/users.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './shared/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import './rxjs.operators';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { CanLeaveEditUserGuard } from './shared/guards/can-leave-edit-user.guard';
import { UserResolverGuard } from './shared/guards/user-resolver.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [IsAuthenticatedGuard] },
  { path: 'users/:id', component: UserComponent, canActivate: [IsAuthenticatedGuard],
    canDeactivate: [CanLeaveEditUserGuard], resolve: {
      user: UserResolverGuard
    } },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, UsersService, IsAuthenticatedGuard, CanLeaveEditUserGuard, UserResolverGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
