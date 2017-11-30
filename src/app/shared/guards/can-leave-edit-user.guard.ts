import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserComponent } from '../../components/user/user.component';

@Injectable()
export class CanLeaveEditUserGuard implements CanDeactivate<UserComponent> {

  canDeactivate(component: UserComponent): Observable<boolean> | Promise<boolean> | boolean {
    return component.canLeave();
  }
}
