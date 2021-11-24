import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor( private http: HttpClient) { }

  miLlamada() {
    return this.http.get(
      `${environment.base_url}`,
      {responseType: 'text'}
      );
  }
}
