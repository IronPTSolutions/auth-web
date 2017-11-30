import { UsersService } from './../../shared/services/users.service';
import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<User> = [];
  error: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.list().subscribe(
      (users) => this.users = users,
      (error) => this.error = error.message
    );
  }

}
