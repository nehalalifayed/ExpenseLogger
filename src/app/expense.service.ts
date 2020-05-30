import { Injectable } from '@angular/core';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  todayTotal : number;
  selectedDate : Date;
  Expensesarray : Expense[];
  

  constructor() { 
    this.Expensesarray = [];
  }

  addExpense_toarray (x : Expense)
  {
    this.Expensesarray.unshift(x);
    this.addtotal(x.amount);
  }

  addtotal (value : number)
  {
    this.todayTotal += value;
  }
}
