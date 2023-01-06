import { Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

import { AllConfigDataService } from 'index';



@Component({
  selector: 'app-manually-sign',
  templateUrl: './manually-sign.component.html',
  styleUrls: ['./manually-sign.component.scss'],
})
export class ManuallySignComponent implements OnInit, AfterViewInit {
  @Input() imageList: any;
  @Input() errorList: any;

  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;
  currentSign: string;
  appName: any;

  constructor(private modalCtrl: ModalController, private allConfigDataService: AllConfigDataService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.appName = this.allConfigDataService.getConfig('appName');
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  gotoBack(){
    this.modalCtrl.dismiss();
  }

  dismiss(e){
    this.modalCtrl.dismiss();
  }

  init() {
    // const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight - 140;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }
  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(0,0,0)';
  }

  save(): void {
    this.currentSign = this.signaturePad.toDataURL();
    this.modalCtrl.dismiss(this.currentSign);
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

}
