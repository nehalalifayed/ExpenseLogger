import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Expense } from 'src/app/expense';
import { ToastController } from '@ionic/angular';
import { ExpenseService } from 'src/app/expense.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})


export class AddComponent implements OnInit {
  @Input('date') date:Date;
  ExpenseTypes : any[] = ['Gerneral' , 'Food' , 'Groceries' , 'Movies' , 'clothing' , 'Meds' , 'Games' , 'Sports' , 
                          'Electronics' , 'Furniture' , 'Rent' , 'gifts' , 'Insurance' , 'Taxes' , 'Gas' , 'internet' , 'Mobile'
                          , 'Other'];

  constructor(public  modalController: ModalController , public toastcontroller: ToastController , public Expenseserv : ExpenseService) {
  }

  async presentToast() {
    const toast = await this.toastcontroller.create({
      message: 'please enter a valid amount value',
      duration: 1500 , 
      color : 'warning' , 
      position:"top"
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  createExpense(amount : HTMLInputElement , desc : HTMLInputElement , type : HTMLSelectElement)
  {
    if(amount.value ==="" || amount.value <= '0')  
    {
      this.presentToast();
      return;
    }
    this.date = new Date(this.date);
    const ex = new Expense(Number(amount.value) ,type.value ,  desc.value , this.date.toDateString());
    this.Expenseserv.addExpense_toarray(ex);
    this.dismiss();
  }

  ngOnInit() {}

}
