import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from "rxjs";
import { tap, map, takeWhile } from "rxjs/operators";
import { NetworkService } from '../../services/network.service';
// declare var SMSReceive: any;
@Component({
  selector: 'lib-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
})
export class VerificationCodeComponent implements OnInit {
  @Input() type: any;
  @Input() errorList: any;
  loggedInModal: boolean = false
  ErrorMsg: any;
  public verificationCodeFormGroup: FormGroup;
  private loginPinValue: string;
  private loginPinValueAuto: string
  @Output() otpVerification = new EventEmitter();
  @Output() resendOTPVerification = new EventEmitter();
  showResendButton: boolean = true;
  private maxValue = 30;
  countDown$: any;

  // o1: any;
  // o2: any;
  // o3: any;
  // o4: any;
  // o5: any;
  // o6: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  constructor(private networkService: NetworkService) {
  }

  ngOnInit() {
    
    this.networkService.onNetworkChange().subscribe((data: any) => {
      // console.log(data)
      this.currentNativeNetwork = data;
      
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      // console.log(data)
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      // console.log(data)
      this.currentWindowNetwork = data;
    })
    
    this.createPinForm();
    this.resendTimeOut();
    // this.start();

  }
  successModalClose() {
    this.loggedInModal = false
  }

  private createPinForm() {
    this.verificationCodeFormGroup = new FormBuilder().group({
      otp1: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp2: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp3: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp4: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp5: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp6: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])]
    });
  }

  // start() {
  //   SMSReceive.startWatch(
  //     () => {
  //       document.addEventListener('onSMSArrive', (e: any) => {
  //         if (e.data) {
  //           this.o1 = e.data.body.slice(0, 1);
  //           this.o2 = e.data.body.slice(1, 2);
  //           this.o3 = e.data.body.slice(2, 3);
  //           this.o4 = e.data.body.slice(3, 4);
  //           this.o5 = e.data.body.slice(4, 5);
  //           this.o6 = e.data.body.slice(5, 6);
  //           this.loginPinValueAuto = ''.concat(
  //             this.o1,
  //             this.o2,
  //             this.o3,
  //             this.o4,
  //             this.o5,
  //             this.o6,
  //           );
  //           if (this.loginPinValueAuto) {
  //             this.otpVerification.emit(this.loginPinValueAuto)
  //           }
  //           this.stop();
  //         }
  //       });
  //     },
  //     () => { console.log('watch start failed') }
  //   )
  // }
  // stop() {
  //   SMSReceive.stopWatch(
  //     () => { console.log('watch stopped') },
  //     () => { console.log('watch stop failed') }
  //   )
  // }


  //   onDigitInput(event){
  //     console.log("event",event)
  //     console.log("event.srcElement.nextElementSibling",event.srcElement.nextElementSibling)
  //     let element;
  //     if (event.code !== 'Backspace')
  //          element = event.srcElement.nextElementSibling;
  //          element.focus();

  //      if (event.code === 'Backspace')
  //          element = event.srcElement.previousElementSibling;
  //          element.focus();

  //      if(element == null)
  //          return;
  //      else
  //          element.focus();
  //  }
  onDigitInput(event, next, prev) {
    // if (index == 6) {
    //   console.log("submit")
    // }
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }

  setFocusEvent(event) {
    console.log(event)
  }
  public onSubmitVerificationAuthentication() {
    //Login Pin api
    // Currently waiting to hear back about the correct password and the domain on which this
    // is to be run.
    if (this.verificationCodeFormGroup.invalid) {
      return;
    }

    this.loginPinValue = ''.concat(
      this.verificationCodeFormGroup.value.otp1,
      this.verificationCodeFormGroup.value.otp2,
      this.verificationCodeFormGroup.value.otp3,
      this.verificationCodeFormGroup.value.otp4,
      this.verificationCodeFormGroup.value.otp5,
      this.verificationCodeFormGroup.value.otp6
    );

    if (this.loginPinValue) {
      this.otpVerification.emit(this.loginPinValue)
    }
  }

  resendOTP() {
    if(this.isCordovaStatus){
      if (this.currentNativeNetwork) {
        this.showResendButton = true;
        this.resendTimeOut();
        this.resendOTPVerification.emit(true);
        this.verificationCodeFormGroup.reset();
      } else {
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }  
    }else{
      if (this.currentWindowNetwork) {
        this.showResendButton = true;
        this.resendTimeOut();
        this.resendOTPVerification.emit(true);
        this.verificationCodeFormGroup.reset();
      } else {
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
    }

    
  }

  resendTimeOut() {
    this.countDownEvent();
    setTimeout(() => {
      this.showResendButton = false;
    }, 30000);
  }

  countDownEvent() {
    this.countDown$ = interval(1000).pipe(
      map(value => this.maxValue - value),
      takeWhile(x => x >= 0)
    );
  }


}
