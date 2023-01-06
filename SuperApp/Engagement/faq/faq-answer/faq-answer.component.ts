import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Navigation } from 'swiper';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-faq-answer',
  templateUrl: './faq-answer.component.html',
  styleUrls: ['./faq-answer.component.scss'],
})
export class FaqAnswerComponent implements OnInit {
  imageList: any;
  headers: any;
  @Input() Header: any;
  cartCount

  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService, private modalController: ModalController, private router: Router) { 
   this.Header=this.router.getCurrentNavigation().extras.state.Header;
   this.headers = this.Header.header.productName;
  }

  ngOnInit() { 
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  chatBot(){
    this.router.navigate(['Engagement/EngagementChatbot'+'/chatbot'])
  }
  goBack(){
    this.router.navigate(['Engagement/EngagementFaqs'])
  }
}
