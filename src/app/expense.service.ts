import { Injectable } from '@angular/core';
import { Expense } from './expense';
import { BehaviorSubject } from 'rxjs';
import{Storage} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  todayTotal : number;
  selectedDate : Date;
  Expensesarray : Expense[];
  todayamount : BehaviorSubject<number>;
  Expenseobserv :  BehaviorSubject<Expense[]>;
  
  constructor() { 
    this.Expensesarray = [];
    this.todayTotal = 0;
    this.todayamount = new BehaviorSubject(this.todayTotal);
    this.todayamount.asObservable();
    this.Expenseobserv = new BehaviorSubject(this.Expensesarray);
    this.Expenseobserv.asObservable();
    
  }

  addExpense_toarray (x : Expense)
  {
    this.Expensesarray.unshift(x);
    this.addtotal(x.amount);
    this.SaveExpensetostorage(x.date).then(success =>{
      this.Expenseobserv.next(this.Expensesarray);
    })
  }

  addtotal (value : number)
  {
    this.todayTotal += value;
   // console.log(this.todayTotal);
   this.todayamount.next(this.todayTotal);
  }

  async SaveExpensetostorage (date : string)
  {
    await Storage.set({key : date , value : JSON.stringify(this.Expensesarray)});
  }

  //async clear() {
   // await Storage.clear();
  //} 
  async getExpenseFromStorage ()
  {
  // this.clear();
    await Storage.get({key : this.getcurrentDate()}).then(value => {
      this.Expensesarray = [];
      const objects: Expense[] = JSON.parse(value.value);
      if (objects != null)
      this.Expensesarray = objects;
      else
      this.Expensesarray = [];
    })
  }

  getcurrentDate()
  {
    return new Date().toDateString();
  }



  intitamount()
  {
    let totalamount2 : number = 0;
    this.Expensesarray.forEach(element => {
      totalamount2 += element.amount;
    });
    this.todayTotal = Math.round(totalamount2);
    this.todayamount.next(this.todayTotal);
  }


  async getspecific_Data(date : Date)
  {
    this.selectedDate = date;
   // console.log(date.toDateString);
    await Storage.get({key:date.toDateString()}).then(value => {
      this.Expensesarray = [];
      const objects: Expense[] = JSON.parse(value.value);
      if (objects != null)
      this.Expensesarray = objects;
      else
      this.Expensesarray = [];
   
    this.Expenseobserv.next(this.Expensesarray);
  });
  this.intitamount();
  }

}
