import { CommonService } from 'projects/core/src/lib/services/common.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
// import domtoimage from 'dom-to-image';
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'lib-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
@Input() txnID:any;
invoiceData:any;
newdate:any=new Date()
imageList:any
downloadInvoice:any=false
appEnviron: any;
breadCrumb: any;
apiCatalog:any
  constructor(private modalCtrl:ModalController,private http:HttpClient,private loader:LoaderService,
    private allConfigDataService:AllConfigDataService,private CommonService:CommonService)
     {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Fullfilment/Wealth/DG'
      }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.loader.showLoader()
    let param={

        "merchantId": "11147",
        "transactionId":this.txnID.trasactionId

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getInvoicedetails,param).subscribe(async (res:any) => {
      if(res){
        this.invoiceData=res.result.data;

        this.loader.hideLoader()
      }
      else {
        this.loader.hideLoader()
        this.modalCtrl.dismiss("data")
      }
    })
    // this.downloadAsPDF()
  }

  async back()
  {
    this.modalCtrl.dismiss("data")
  }

  getinvoice(){

  }

  // exportAsPDF(MyDIv)
  // {
  //   this.downloadInvoice=true
  //   let data = document.getElementById(MyDIv);
  //   html2canvas(data).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     // let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //     let pdf = new jsPDF('p', 'cm', 'a4');// Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'HTML', 0, 0, 20, 23);

  //     pdf.save("Invoice"+this.newdate+".pdf");

  //   });
  //   this.downloadInvoice=false
  // }
  // @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  @ViewChild('pdfTable') pdfTable!: ElementRef;


  // public downloadAsPDF() {
  //   const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const pdfTable = this.pdfTable.nativeElement;

  //   doc.fromHTML(pdfTable.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('tableToPdf.pdf');
  // }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();

  }
  // public downloadAsPDF() {
  //   let div = this.pdfTable.nativeElement;

  //   var img:any;
  //   var filename;
  //   var newImage:any;


  //   domtoimage.toPng(div, { bgcolor: '#fff' })

  //     .then(function(dataUrl) {

  //       img = new Image();
  //       img.src = dataUrl;
  //       newImage = img.src;

  //       img.onload = function(){

  //       var pdfWidth = img.width;
  //       var pdfHeight = img.height;

  //         // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

  //         var doc;

  //         if(pdfWidth > pdfHeight)
  //         {
  //           doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
  //         }
  //         else
  //         {
  //           doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
  //         }


  //         var width = doc.internal.pageSize.getWidth();
  //         var height = doc.internal.pageSize.getHeight();


  //         doc.addImage(newImage, 'PNG',  10, 10, width, height);
  //         filename = 'mypdf_' + '.pdf';
  //         doc.save(filename);

  //       };


  //     })
  //     .catch(function(error) {

  //      // Error Handling

  //     });

  // }




}
