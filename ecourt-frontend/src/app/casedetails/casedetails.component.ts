import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import * as PDFJS from "pdfjs-dist";
var pdfDoc:any = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending:any = null;
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
  totalPages: number = 0;
  pages: any = [];
  url: string = '';
  constructor(private http: HttpService, private route: ActivatedRoute){}
  ngOnInit():void{
    this.cnr = this.route.snapshot.paramMap.get('cnr');
    this.http.view_docs(this.cnr).subscribe({
      next: data => {
        this.details = data.details;
        this.docs = data.docs;
      }
    })
    PDFJS.GlobalWorkerOptions.workerSrc = '../../assets/scripts/script.js'
  }
  onUpdateUrl(document_type:string, document_name: string, case_id:string){
    this.url = `http://localhost:8000/api/media/${case_id}/${document_type}/${document_name}`;
    this.displayDoc();
  }
  renderPage(num:any) {
    let scale = 0.8,
    canvas:any = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page:any) {
      var viewport = page.getViewport({scale: scale});
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
  
      // Wait for rendering to finish
      renderTask.promise.then(function() {
        pageRendering = false;
        if (pageNumPending !== null) {
          // New page rendering is pending
          //renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });
  }
  selectPage(event:any){
    pageNum = parseInt(event.target.value);
    this.renderPage(pageNum);
  }
  displayDoc(){
    PDFJS.getDocument(this.url).promise.then((pdfDoc_) => {
      pdfDoc = pdfDoc_;
      this.totalPages = pdfDoc.numPages;
      for(var i=1;i<pdfDoc.numPages+1;i++){
        this.pages.push(i);
      }
      // document.getElementById('page_count').textContent = pdfDoc.numPages;
    
      // Initial/first page rendering
      this.renderPage(pageNum);
    });
    this.pages = [];
  }
  queueRenderPage(num:any) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }
  prevPage(){
    if (pageNum <= 1) {
      return;
    }
    pageNum--;
    this.queueRenderPage(pageNum);
  }
  nextPage(){
    if (pageNum >= pdfDoc.numPages) {
      return;
    }
    pageNum++;
    this.queueRenderPage(pageNum);
  }
}

