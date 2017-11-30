import { Observable } from 'rxjs/Rx';
import { User } from './../models/user.model';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserResolverGuard implements Resolve<User> {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  resolve(routes: ActivatedRouteSnapshot): Observable<User> {
    return this.usersService.get(routes.params['id'])
      .catch((err) => {
        this.router.navigate(['/users']);
        return Observable.of(err);
      });
  }
}
