import { Component } from '@angular/core';
import { HttpService } from '../services/http/http.service';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent {
  today: string = '';
  cases: any = [];
  constructor(private http: HttpService){}
  ngOnInit():void{
    let days = ['Sunday','Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December'];
    let date = new Date();
    let month = months[date.getMonth()].toUpperCase();
    let day = days[date.getDay()].toUpperCase();
    let year = date.getFullYear();
    let today_date = date.getDate();
    this.today = `FOR ${day}, THE ${today_date} DAY OF ${month}, ${year}`;
    let current_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate().toString().padStart(2, "0")}`;
    this.http.get_cause_list(current_date).subscribe({
      next: data => {
        this.cases = data;
      }
    })
  }
}
