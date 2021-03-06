import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceService } from '../api/service.service';
import { NavController, Platform, AlertController, ModalController } from '@ionic/angular';
import { AlertifyService } from '../api/alertify.service';
import { NavigationExtras } from '@angular/router';




@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
})
export class RatesPage implements OnInit {
  data: any;
  data1: any;
  term: string;
  term1: string;
  show: any;
  show1: any;
  subscription: any;
  match: boolean;
  count = 0;

  constructor(private service: ServiceService, private platform: Platform,
              private navCtrl: NavController, private alert: AlertController,
              private alrtify: AlertifyService) { }

  ngOnInit() {
    this.service.getPolPod().subscribe((data: (any)) => this.data = data);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
        // tslint:disable-next-line: no-string-literal
        this.navCtrl.navigateForward('/dashboard');
    });
}

ionViewWillLeave() {
  this.subscription.unsubscribe();
}


getContainerRates() {
  this.count = 0;
  this.service.getContainerRates().subscribe(data => {
    this.data1 = data;
    for (const i of Object.keys(this.data1)) {
      if (this.term === this.data1[i].pol && this.term1 === this.data1[i].pod) {
        this.count = this.count + 1;
        console.log(this.term + ' ' + this.data1[i].pol);
        console.log(this.term1 + ' ' + this.data1[i].pod);
      }
    }
  }, error => {
    this.alrtify.error('Oops something went wrong');
  }, () => {
    if (this.count === 0) {
      this.alrtify.error('Results do no match!');
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
            t1: this.term,
            t2: this.term1,
            d1: this.count
        }
    };
      this.navCtrl.navigateForward(['/rates/details'], navigationExtras);
    }
  });


 /* this.service.getContainerRates().subscribe( data => {
    this.data1 = data;
  }, error => {
    this.alrtify.error('ERROR');
  });
  console.log(this.data1);
  console.log(this.term + ' ' + this.term1); */
}


  edit(name) {
    this.term = name;
    this.show = !this.show;
  }

  edit1(name) {
    this.term1 = name;
    this.show1 = !this.show1;
  }

  toggle() {
    console.log('clicked now');
    this.show = true;
  }

  toggle1() {
    this.show1 = true;
  }

}
