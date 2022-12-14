import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  case_url = 'http://hcs.gov.in/HighCourtWebService/hgqueryhh.php?';
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
  view_docs(cnr:string){
    return this.http.get<any>(`${URL}/api/view-details`, { params: { cnr: cnr } } );
  }
  get_docs(case_id:string){
    return this.http.get<any>(`${URL}/api/get-docs`, { params: { case_id: case_id } } );
  }
  add_bookmark(fd:any){
    return this.http.post(`${URL}/api/bookmark`, fd);
  }
  add_note(fd:any){
    return this.http.post(`${URL}/api/note`, fd)
  }
  get_orders(cnr: string){
    return this.http.get<any>(`${this.case_url}hgordertoken=${cnr}`)
  }
  get_doc_types(){
    return this.http.get<any>(`${URL}/api/doc-types`);
  }
  delete_note(id:string){
    return this.http.delete(`${URL}/api/note?id=${id}`);
  }
  delete_bookmark(id:string){
    return this.http.delete(`${URL}/api/bookmark?id=${id}`);
  }
}
