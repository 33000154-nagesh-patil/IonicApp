import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { IncomeUpdatedComponent } from '../managelock/income-updated/income-updated.component';
// import { IncomeUpdatedComponent } from '../income-updated/income-updated.component';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'lib-update-income-range',
  templateUrl: './update-income-range.component.html',
  styleUrls: ['./update-income-range.component.scss'],
})
export class UpdateIncomeRangeComponent implements OnInit {
  selectedValue: string;
  selectedCar: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: '1Lac to 5Lac'},
    {value: 'pizza-1', viewValue: '5Lac to 10Lac'},
    {value: 'tacos-2', viewValue: '10Lac to 20Lac'},
    {value: 'tacos-3', viewValue: 'Above 20Lac'},

  ];

  imageList: any;

  constructor(private allConfigDataService: AllConfigDataService,private modalCtrl: ModalController) { }

  ngOnInit() {}


  async updatedIncome(){
    this.modalCtrl.dismiss()
    const modal = await this.modalCtrl.create({
      component:IncomeUpdatedComponent ,
      cssClass: 'income-modal .modal-wrapper',
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
       
      });
    return await modal.present();
 }

 cancel()
 {
  this.modalCtrl.dismiss()
 }

}
