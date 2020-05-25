import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  constructor(public  modalController: ModalController) {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {}

}
