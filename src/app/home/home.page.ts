import { Component } from '@angular/core';
import { AddComponent } from '../components/add/add.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public  modalController: ModalController) {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddComponent , 
      componentProps : {value : 123}
    });
    return await modal.present();
  }

}
