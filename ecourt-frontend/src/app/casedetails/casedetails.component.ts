import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-casedetails',
  templateUrl: './casedetails.component.html',
  styleUrls: ['./casedetails.component.css']
})
export class CasedetailsComponent {
  cnr: any;
  details: any;
  docs:any = [];
  controllerSrc: any;
  url: string = 'http://localhost:8000/api/media/1/Affidavit/Sampurna Fees.pdf';
  constructor(private http: HttpService, private route: ActivatedRoute, private sanitizer: DomSanitizer){}
  ngOnInit():void{
    this.cnr = this.route.snapshot.paramMap.get('cnr');
    this.http.view_docs(this.cnr).subscribe({
      next: data => {
        this.details = data.details;
        this.docs = data.docs;
      }
    })
  }
  // onUpdateUrl(document_type:string, document_name: string, case_id:string){
  //   this.url = `http://localhost:8000/api/media/${case_id}/${document_type}/${document_name}`;
  //   this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  // }
}
