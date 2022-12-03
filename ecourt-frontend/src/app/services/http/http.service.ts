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
  uploadDocs(fd:any){
    return this.http.post(`${URL}/api/upload-docs`, fd, { reportProgress: true, observe: "events"});
  }
  get_cases(){
    return this.http.get<any>(`${URL}/api/get-cases`);
  }
  create_cause_list(fd:any){
    return this.http.post(`${URL}/api/get-cases`, fd)
  }
  get_cause_list(date: any){
    return this.http.get<any>(`${URL}/api/get-causelist`, { params: { date: date } } );
  }
}
