import { Component } from '@angular/core';
import { AddComponent } from '../components/add/add.component';
import {ModalController} from '@ionic/angular';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   selectedDate : Date;
   TotalSpending : number;
   expenses : Expense[];
   

  constructor(public  modalController: ModalController , public Servicecontrollor : ExpenseService , public toastcontroller: ToastController ) {
   // this.TotalSpending =0;
    // this.expenses = this.Servicecontrollor.Expensesarray;
    this.Servicecontrollor.todayamount.subscribe(value => {
     this.TotalSpending  = value;
   });
   this.Servicecontrollor.Expenseobserv.subscribe(value => {
    this.expenses  = value;
  });
   this.selectedDate=null;
   if(this.selectedDate == null)  this.TotalSpending = 0;
  }


  async presentToast() {
    const toast = await this.toastcontroller.create({
      message: 'please Select a valid date first to put your expenses in',
      duration: 1500 , 
      color : 'warning' , 
      position:"top"
    });
    toast.present();
  }


  async presentModal() {
    if(this.selectedDate === null)
    {
      this.presentToast();
      return;
    }
    const modal = await this.modalController.create({
      component: AddComponent , 
      componentProps : {date : this.selectedDate}
    });
   
    return await modal.present();
  }

  getspecificData()
  {
    //console.log(this.selectedDate);
    this.Servicecontrollor.getspecific_Data(new Date(this.selectedDate|| new Date())).then(res => {
      this.Servicecontrollor.intitamount();
    });
  }

}
