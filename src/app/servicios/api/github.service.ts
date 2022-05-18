import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http : HttpClient) { }

  host = "https://api.github.com/users/rocioburgos";

  traerTodo(){
    return this.http.get(`${this.host}`).toPromise();
  }

}
