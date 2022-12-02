import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent {
  heading = 'Add Details';
  @Output('displayUploadDocs') uploadDocs: any = new EventEmitter<{status: boolean}>;
  constructor (private http: HttpService) {} 
  showUploadDocs(){
    this.uploadDocs.emit({
      status: true,
    });
  }
  onCaseEntry(data: any){
    let fd = new FormData();
    fd.append('case_no', data.value.case_no);
    fd.append('cnr', data.value.cnr);
    fd.append('first_petitioner', data.value.first_petitioner);
    fd.append('first_respondent', data.value.first_respondent);
    fd.append('petitioner_counsels', 'Hello');
    fd.append('respondent_counsels', 'World');
    fd.append('additional_petitioners', 'to Digital');
    fd.append('additional_respondents', 'Courts');
  }
}
