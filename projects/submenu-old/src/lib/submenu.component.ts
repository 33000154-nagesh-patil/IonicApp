import { getLocaleDateFormat } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';

@Component({
  selector: 'lib-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {
  @Input() submenuList: any;
  @Input() version: any;
  @Output() callLogOut = new EventEmitter();
  @Output() reDirect = new EventEmitter();


  public isMenuOpen: boolean = true;
  public isMenuSaverOpen: boolean = true;
  public isMenuInsurenceOpen: boolean = false;
  public isMenuInstantrOpen: boolean = false;
  public isMenuOtherOpen: boolean = true;
  public ArrowSign: boolean = false;
  public isSubMenuOpen: boolean = false;

  public strFirstName: string = "";
  public profileName: string = "";
  isKycCompleted: any=false;
  constructor(private menu: MenuController, private commonFunctionService: CommonFunctionService, private commonService:CommonService) {

  }


  ngOnInit() {
    if (this.menu.isEnabled) {
      this.menu.close();
    }
    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.strFirstName = data?.FirstName?data?.FirstName:'user';
        this.profileName = this.commonFunctionService.getShortName(data?.FirstName?.replace(/\s/g, "").concat(' ', data?.LastName?.replace(/\s/g, "")));
      }
    })

  }

  openMenu() {
    // this.menu.enable(true, 'first');
    // if(this.menu.isEnabled){
    //   this.menu.open()
    // }
    this.menu.open()
    // console.log("menu clicked")
  }

  closeMenu() {
    // this.menu.open('end');
    this.menu.close()
  }

  public toggleAccordion(id): void {
    if (id == 1) {
      this.ArrowSign = !this.ArrowSign;
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  public toggleMenuSaver() {
    this.isMenuSaverOpen = !this.isMenuSaverOpen;
  }

  public toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  public toggleOtherMenu() {
    this.isMenuOtherOpen = !this.isMenuOtherOpen;
  }

  public navigateTo(path) {
    if (this.menu.isEnabled) {
      this.menu.close();
    }
    if (path == "Logout") {

      this.callLogOut.emit('logout')
    }else{
    this.reDirect.emit(path);
    }
  }

  logout() {
    this.callLogOut.emit('logout')
  }
}
