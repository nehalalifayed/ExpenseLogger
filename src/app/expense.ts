export class Expense {
    ID : number;
    amount : number;
    type : string;
    description : string;
    date : string;

    constructor(amount : number , type : string ,description : string  , date : string)
    {
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.date = date;
        this.ID = Math.floor(Math.random() * 1000);
    }
}
