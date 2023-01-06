import { ModalController, MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ViewChildren, AfterViewChecked, ElementRef, OnInit, QueryList, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
import chatbot from './../chatbot.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  @ViewChild('target') private myScrollContainer: ElementRef;
  indexVal: any = -2;
  thumbDis: any = false;
  isDisabled: boolean = false;
  messages = [];
  newData = [];
  reciever: any;
  thumbs: any = false;
  cartCount;
  Title = "ChatBot"
  imageList: any;
  selectedMsg: any;
  loader: boolean;
  dummy: any;
  thums: boolean = false;
  thumsUp: any = false;
  thumsDown: boolean = false;
  feedback: boolean = false;
  disabledButtons = [];
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  newMsg: string = '';
  ArrayEnd: any;
  type: any = 'Chat';
  Category: any;
  SubCategory: any;
  sessionEnd: any = false;
  description: any
  reader: FileReader;
  fileInfo: string;
  photo1: string;
  ticketId: string

  constructor(private menu: MenuController, private allConfigDataService: AllConfigDataService,
    private allconfig: AllConfigDataService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private mdlctrl: ModalController) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementChatBot';
  }

  ngOnInit() {
    this.getChat();
    this.imageList = this.allconfig.getConfig('images')
  }

  scrollToElement(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }


  getChat() {
    let params = {
      'TokenId': localStorage.getItem('id_token'),
      'Input': null,
      'Type': this.type
    }


    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.chatbot, params).subscribe((data: any) => {
      this.messages = data.messages;
      console.log(data, "chatbot data");
      this.ArrayEnd = this.messages.length - 1
      // this.messages.push({
      //   id: data.id,
      //   user: data.user,
      //   msg: data.msg,
      //   btn: data.btn,  
      //   msg1: data.msg1
      // })
      setTimeout(() => {
        this.scrollToElement();
      }, 500)
    })
  }

  thumsUpDown(val) {
    this.thumbs = true;
    this.messages.push({
      id: 3,
      user: 'sender',
      msg: 'Thanks for the Feedback !',
      btn: [],
      msg1: ''
    })
    if (val == 'thumsUp') {
      this.isDisabled = true;
      this.thumsUp = true;
      this.feedback = true;
      this.thumsDown = false;
      this.thumbDis = true;
    }
    else {
      this.thumsUp = false;
      this.thumsDown = true;
      this.feedback = true;
      this.thumbDis = true;
    }
    setTimeout(() => {
      this.scrollToElement();
    }, 200)

  }

  query(e) {
    this.newMsg = ''
    this.indexVal = this.indexVal + 2;
    this.loader = true;
    this.scrollToElement();
    setTimeout(() => {
      this.chatReq(e);
      this.loader = false;
    }, 2000)

  }


  chatReq(val) {
    console.log(val, "jjjjjjjjjjjjjj");


    this.messages.push({
      id: 3,
      user: 'receiver',
      msg: val,
      btn: [],
      msg1: ''
    })


    // this.thumbs = true;
    // this.messages.push({
    //   id: 3,
    //   user: 'sender',
    //   msg: 'Was this solution helpful ?',
    //   btn: [],
    //   msg1: ''
    // })



    if (val == 'General Query') {
      this.type = 'Chat'; 
      if(this.Category)this.Category='';
      if(this.SubCategory)this.SubCategory='';
      console.log(this.Category,'Cat')   
    } else if (val == 'Raise a complaint') {
      this.type = 'Complaint'
      if(this.Category)this.Category='';
      if(this.SubCategory)this.SubCategory='';
    }

    let params = {
      'TokenId': localStorage.getItem('id_token'),
      'Input': val,
      'Type': this.type,
      'Category': this.Category ? this.Category : '',
      'SubCategory': this.SubCategory ? this.SubCategory : ''
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.chatbot, params).subscribe((data: any) => {
      this.newData = data.messages;
      this.messages.push({
        ...this.newData[0]
      })
      this.thumbsDownRes(this.newData[0].IsChatEndOut)
      this.ArrayEnd = this.messages.length - 1;
      //if(val == 'Raise a complaint' || val == 'General Query')this.SubCategory == ''; this.Category == '';      
      this.Category = this.messages[3].msg;
      this.SubCategory = this.messages[5].msg;

    
    })

    setTimeout(() => {
      this.scrollToElement();
    }, 500)
    // this.disabledButtons.push(val)
  }
  currentUser = 'sender';


  goback() {
    this.messages.splice(1)
    this.mdlctrl.dismiss();
    this.location.back();
  }

  sendMessage(val) {
    this.messages.push({
      id: 1,
      user: 'receiver',
      msg: val,
      btn: [],
      msg1: ''
    });
    setTimeout(() => {
      this.scrollToElement();
    }, 500)
    this.newMsg = '';
  }


  thumbsDownRes(e) {
    console.log(e, "event");

    if (e == 'chat') {
      alert("Requesting Chat...")
    } else if (e == 'call' || e == 1) {
      this.sessionEnd = true
      let params = {
        'TokenId': localStorage.getItem('id_token'),
        "Photo1": this.photo1,
        "Photo2": "",
        "Category": this.Category,
        "SubCategory": this.SubCategory,
        "IssueType": "",
        "RequestType": this.type,
        "IssueDescription": this.description
      }
      this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.insertComplaint, params).subscribe((data: any) => {
        console.log(data);
        this.ticketId = data.ticketId
      })
    }
    console.log(this.messages, "popopopopo");

  }

  getDes(value) {
    this.description = value.target.value
  }
  onFileSelect(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.photo1 = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
