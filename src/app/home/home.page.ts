import { Component } from '@angular/core';
import { AddComponent } from '../components/add/add.component';
import {ModalController} from '@ionic/angular';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   selectedDate : Date;
   TotalSpending : number;
   expenses : Expense[];
   

  constructor(public  modalController: ModalController , public Servicecontrollor : ExpenseService) {
     this.TotalSpending = 0;
     this.expenses = this.Servicecontrollor.Expensesarray;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddComponent , 
      componentProps : {date : this.selectedDate}
    });
   
    return await modal.present();
  }

}
