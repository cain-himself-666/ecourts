import { Component, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import * as PDFJS from "pdfjs-dist";
import { URL } from 'src/environments/environment.prod';
import {Location} from '@angular/common';
var pdfDoc:any = null,
    pageRendering = false,
    pageNumPending:any = null;
@Component({
  selector: 'app-casedetails',
  templateUrl: './casedetails.component.html',
  styleUrls: ['./casedetails.component.css']
})
export class CasedetailsComponent {
  menu_name: string = '';
  showLoading: boolean = false;
  date:any;
  orders: any = [];
  cnr: any;
  details: any;
  docs:any = [];
  note_date:any;
  note_time:any;
  bookmarks:any = [];
  notes: any = [];
  note_data: string = '';
  case_id: string = '';
  doc_id: string = '';
  controllerSrc: any;
  pageNum:number = 1;
  totalPages: number = 0;
  pages: any = [];
  url: string = '';
  showPanel: boolean = false;
  toggleSubMenu: boolean = false;
  constructor(private http: HttpService, private route: ActivatedRoute, private _location: Location){}
  ngOnInit():void{
    this.cnr = this.route.snapshot.paramMap.get('cnr');
    this.onGetDetails();
    PDFJS.GlobalWorkerOptions.workerSrc = '../../assets/scripts/script.js';
    let date = new Date();
    this.date = date.getDate();
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.onUpdateUrl(this.docs[0].doc_id, this.docs[0].document_type, this.docs[0].doc_name);
    }, 300);
  }
  goBack(){
    this._location.back();
  }
  onUpdateUrl(doc_id: string,document_type:string, document_name: string){
    this.pageNum = 1;
    this.url = `${URL}/api/media/${this.case_id}/${document_type}/${document_name}`;
    this.displayDoc(this.pageNum);
    this.doc_id = doc_id;
  }
  onUpdateOrderUrl(pdf: string){
    this.pageNum = 1;
    this.url = `https://hcs.gov.in/hcs/hg_orders/${pdf}`;
    this.displayDoc(this.pageNum);
  }
  onGetBookmark(case_id:string, document_name:string, document_type:string, page_no: string){
    this.url = `${URL}/api/media/${case_id}/${document_type}/${document_name}`;
    this.pageNum = parseInt(page_no);
    this.displayDoc(this.pageNum);
  }
  renderPage(num:any) {
    this.showPanel = true;
    let canvas:any = document.getElementById('the-canvas'),
    scale = 1.9,
    ctx = canvas.getContext('2d');
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page:any) {
      var viewport = page.getViewport({scale: scale});
      if(viewport.height > 2000){
        var viewport = page.getViewport({scale: 0.8});
      }
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
  selectPage(page:any){
    this.pageNum = parseInt(page);
    this.renderPage(this.pageNum);
  }
  displayDoc(num:any){
    // this.pageNum = 1;
    PDFJS.getDocument(this.url).promise.then((pdfDoc_) => {
      pdfDoc = pdfDoc_;
      this.totalPages = pdfDoc.numPages;
      for(var i=1;i<pdfDoc.numPages+1;i++){
        this.pages.push(i);
      }
      // Initial/first page rendering
      this.renderPage(num);
    })
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
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }
  nextPage(){
    if (this.pageNum >= pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }
  addBookmark(){
    let fd = new FormData();
    fd.append('page_no', this.pageNum.toString());
    fd.append('case_id', this.case_id);
    fd.append('document_id', this.doc_id);
    fd.append('bookmark_label', '');
    this.http.add_bookmark(fd).subscribe({
      next: data => {
        this.onGetDetails();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  addNote(data:any){
    let fd = new FormData();
    fd.append('note', data.value.note);
    fd.append('case_id', this.case_id);
    this.http.add_note(fd).subscribe({
      next: data => {
        this.onGetDetails();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onShowNote(note:any, date:any){
    this.note_data = note;
    this.note_date = date;
  }
  onGetDetails(){
    this.http.view_docs(this.cnr).subscribe({
      next: data => {
        this.details = data.details;
        this.docs = data.docs;
        this.bookmarks = data.bookmarks;
        this.notes = data.notes;
        this.case_id = data.details.case_id;
      }
    })
    this.http.get_orders(this.cnr).subscribe({
      next: data => {
        this.orders = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  deleteNote(id:string){
    this.http.delete_note(id).subscribe({
      next: data => this.onGetDetails(),
      error: err => console.log(err)
    })
  }
  deleteBookmark(id:string){
    this.http.delete_bookmark(id).subscribe({
      next: data => this.onGetDetails(),
      error: err => console.log(err)
    })
  }
  selectPageBuffer(doc_id: string,document_type:string, document_name: string, page:any){
    this.showLoading = true;
    this.onUpdateUrl(doc_id, document_type, document_name);
    this.pageNum = parseInt(page);
    setTimeout(() => {
      this.showLoading = false;
      this.renderPage(this.pageNum);
    },500)
  }
  onToggleSubMenu(name: string){
    if(this.menu_name !== name){
      this.menu_name = name;
      this.toggleSubMenu = false;
    }
    this.toggleSubMenu = !this.toggleSubMenu;
  }
}