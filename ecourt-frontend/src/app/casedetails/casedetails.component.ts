import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http/http.service';
@Component({
  selector: 'app-casedetails',
  templateUrl: './casedetails.component.html',
  styleUrls: ['./casedetails.component.css']
})
export class CasedetailsComponent {
  cnr: any;
  details: any;
  docs:any = [];
  constructor(private http: HttpService, private route: ActivatedRoute){}
  ngOnInit():void{
    this.cnr = this.route.snapshot.paramMap.get('cnr');
    this.http.view_docs(this.cnr).subscribe({
      next: data => {
        this.details = data.details;
        this.docs = data.docs;
      }
    })
  }
}
