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
  showDocs: boolean = false;
  showSuccess: boolean = false;
  docs: any = [];
  @Input('case_id') case_id: string = '';
  constructor(private http: HttpService){}
  ngOnInit():void{
    this.onGetDocs();
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    },1500);
  }
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
        this.onGetDocs();
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
  }
  onGetDocs(){
    this.http.get_docs(this.case_id).subscribe({
      next: data => {
        this.showDocs = data.docs[0] ? (this.showDocs = true, this.docs = data.docs) : false;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
