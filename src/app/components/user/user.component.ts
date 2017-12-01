import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../shared/models/user.model';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  error: string;
  edited: boolean = false;
  uploader: FileUploader;
  apiUrl: string = environment.apiUrl;

  constructor(
    private usersService: UsersService,
    private routes: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.routes.data.subscribe(
      (resolved) => {
        this.user = resolved['user'];
        this.uploader = new FileUploader({
          url: `${environment.apiUrl}/users/${this.user.id}`
        });

        this.uploader.onSuccessItem = (item, response) => {
          this.router.navigate(['/users']);
        };

        this.uploader.onErrorItem = (item, response, status, headers) => {
          this.error = JSON.parse(response).message;
          console.error(response);
        };
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
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.user.name);
    };

    this.uploader.uploadAll();
  }

}
