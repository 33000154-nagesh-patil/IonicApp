import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'projects/core/src/lib/services/authentication.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
})
export class ComingSoonComponent implements OnInit {

  constructor(private router: Router,private authService: AuthenticationService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
     window.addEventListener("keyup", disableF5);
     window.addEventListener("keydown", disableF5);

     function disableF5(e) {
      if ((e.which || e.keyCode) == 116) e.preventDefault();
   };
  }


  login() {
    this.authService.logout();
  }

}
