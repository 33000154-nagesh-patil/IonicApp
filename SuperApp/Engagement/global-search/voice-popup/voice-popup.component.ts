import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonFunctionService } from 'index';
import { VoiceRecognitionService } from '../../../Engagement/Engagement services/voice-recognition.service'

@Component({
  selector: 'app-voice-popup',
  templateUrl: './voice-popup.component.html',
  styleUrls: ['./voice-popup.component.scss'],
  providers: [VoiceRecognitionService]
})
export class VoicePopupComponent implements OnInit {
  // voiceInput: EventEmitter<any> = new EventEmitter()
  record: boolean = false;
  success:boolean = false;
  inputVal: boolean = false;

  constructor(public service : VoiceRecognitionService,private commonFunctionService:CommonFunctionService,private modlctrl:ModalController) {
    this.service.init()
  }

  ngOnInit() {
     setTimeout(() => {
      this.record = true;
      this.inputVal = true;
      this.startService();
     },1200)
  }

  startService(){
    this.service.start();
  }

  stopService(){
    this.service.stop();
    const subsription=this.service.transcriptSubject.subscribe(async (res:any) => {
      // this.voiceInput.emit(res);
      console.log(res,"axdadsad");
      this.modlctrl.dismiss(res)
      subsription.unsubscribe()
    })
    this.record = false;
    this.success = true;
  }
}
