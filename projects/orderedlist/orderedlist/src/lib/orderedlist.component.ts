import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';




@Component({
  selector: 'lib-orderedlist',
  templateUrl: './orderedlist.component.html',
  styleUrls: ['./orderedlist.component.scss'],
})
export class OrderedlistComponent implements OnInit {
  imageList: any;



  

  dataForSuccess={
    medicineName:"Dettol Antiseptic Liquid",
    purchaseDate:"11 Mar 2022, 4:55 PM via UPI",
    userAddress:"Shop No.1 to 05,Ground Floor, Kinjal Paradise, Plot No.43, Andheri west, Maharashtra 402010",
    estimatedDate:"13 March 2022",
    price:"₹250.00",
    transactionsID:"A-hm-FH374-Fghk-34789"
    
  }


  selectTimeSlots=[{
    selectedSlot:"7:00 AM - 11:00 AM"
  },{
    selectedSlot:"11:00 AM - 03:00 PM"
  },
  
    {
      selectedSlot:"03:00 AM - 08:00 AM"
   }
]



  Medicines = [
    {

      medicineName: "Detol Antiseptic Liquid",
      provider: "by Dettol. Bottle of 550 ML",
      price: "₹250.00",
      Date: "01 May 2022",
      pending: "Successful",
      track: "Reorder"
    },
    {
      medicineName: "Detol Antiseptic Liquid",
      provider: "by Dettol. Bottle of 550 ML",
      price: "₹250.00",
      Date: "01 May 2022",
      pending: "Pending",
      track: "Track Order"
    },
    {
      medicineName: "Detol Antiseptic Liquid",
      provider: "by Dettol. Bottle of 550 ML",
      price: "₹250.00",
      Date: "01 May 2022",
      pending: "Successful",
      track: "Reorder"
    },
    {
      medicineName: "Detol Antiseptic Liquid",
      provider: "by Dettol. Bottle of 550 ML",
      price: "₹250.00",
      Date: "01 May 2022",
      pending: "Successful",
      track: "Reorder"
    }

  ]






  dataForOrderDetails={
    medicineName:"Dettol Antiseptic Liquid",
    purchaseDate:"11 Mar 2022,  22:00",
    orderId:"P005047498547",
    estimatedDate:"13 March 2022",
    price:"₹350.00",
    orderQuantity:"1",
    msg:"Yay! You've saved ₹50 on your shopping",
    transactionsID:"A-hm-FH374-Fghk-34789",
    shippingCharge:"₹10.00",
    total:"₹360.00",
    userName:"Pratik Vasant Goswami",
    userAddress:"Shop No.1 to 05,Ground Floor, Kinjal Paradise, Plot No.43, Andheri west, Maharashtra 402010",
    userMobioleNo:"9810806463"
  }
  
  constructor(private allConfigDataService:AllConfigDataService ) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');

    
  
    
  }







}
