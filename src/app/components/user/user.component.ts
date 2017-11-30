import { ActivatedRoute } from '@angular/router';
import { User } from './../../shared/models/user.model';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  error: string;
  edited: boolean = false;

  constructor(
    private usersService: UsersService,
    private routes: ActivatedRoute) {}

  ngOnInit() {
    this.routes.data.subscribe(
      (resolved) => {
        this.user = resolved['user'];
      }
    );
  }

  onFieldChange() {
    this.edited = true;
  }

  canLeave(): boolean {
    if (this.edited) {
      return window.confirm(`
        Unsaved changes.
        Are you sure to leave?
        `);
    }
    return true;
  }

  onEditUserSubmit(editForm) {
    // TODO: implement
  }

}
