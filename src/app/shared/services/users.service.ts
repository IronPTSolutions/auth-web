import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {
  private baseUrl = `${environment.apiUrl}/users`;
  private headers = new Headers({ 'Contetn-type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http) { }

  list(): Observable<Array<User>> {
    return this.http.get(this.baseUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  get(id: string): Observable<User> {
    return this.http.get(`${this.baseUrl}/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  protected handleError(error: Response | any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json());
  }

}
