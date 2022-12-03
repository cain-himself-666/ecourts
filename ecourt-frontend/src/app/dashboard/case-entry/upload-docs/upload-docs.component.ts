import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.css']
})
export class UploadDocsComponent {
  heading = 'Upload Documents';
  file:any;
  progressValue: number = 0;
  @Input('case_id') case_id: string = '';
  constructor(private http: HttpService){}
  onUploadDoc(data: any){
    let fd = new FormData();
    fd.append('case_id', this.case_id);
    fd.append('document', this.file);
    fd.append('display_name', data.value.display_name);
    fd.append('document_type', data.value.doc_type);
    this.http.uploadDocs(fd).pipe(map(events => {
      switch(events.type){
        case HttpEventType.UploadProgress:
          this.progressValue = Math.round(events.loaded/events.total! * 100);
          break;
        case HttpEventType.Response:
          setTimeout(() => {
            this.progressValue = 0;
          },250)
      }
    })).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onSelectFile(event:any){
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
    }
    console.log(this.file);
  }
}
