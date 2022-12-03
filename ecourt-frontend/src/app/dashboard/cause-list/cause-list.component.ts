import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-cause-list',
  templateUrl: './cause-list.component.html',
  styleUrls: ['./cause-list.component.css']
})
export class CauseListComponent {
  cases: any;
  sno: string = '';
  cno: string = '';
  name: string = '';
  date: string = '';
  constructor(private http: HttpService){}
  ngOnInit(){
    this.http.get_cases().subscribe({
      next: data => {
        this.cases = data
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onCreateCauseList(data:any){
    let fd = new FormData();
    fd.append('case_id', data.value.cno);
    fd.append('sno', data.value.sno);
    fd.append('name', data.value.name);
    fd.append('date', data.value.date);
    this.http.create_cause_list(fd).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
