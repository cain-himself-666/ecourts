import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  case_entry(fd:any){
    return this.http.post<any>(`${URL}/api/case-entry`, fd);
  }
}
