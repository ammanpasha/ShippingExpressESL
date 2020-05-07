import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Booking } from '../_models/booking';
import { ServiceService } from '../api/service.service';
import { AlertifyService } from '../api/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
subscription: any;
equip: string;
bookingForm: FormGroup;
booking: Booking;

  constructor(private platform: Platform, private navCtrl: NavController,
              private service: ServiceService, private alertify: AlertifyService, private router: Router) { }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
        // tslint:disable-next-line: no-string-literal
        this.navCtrl.navigateForward('/dashboard');
    });
}

ionViewWillLeave() {
  this.subscription.unsubscribe();
}

  ngOnInit() {
    this.bookingForm = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      equip: new FormControl(),
      vol: new FormControl(),
      terms: new FormControl(),
      BLmentioned: new FormControl(),
      tradeLane: new FormControl(),
      pol: new FormControl(),
      pod: new FormControl(),
      supplierDetails: new FormControl(),
      CNEEdetails: new FormControl(),
      notifyCNEE: new FormControl(),
      cmdty: new FormControl(),
      grossWeight: new FormControl(),
      encashmentCert: new FormControl(),
      ftaCert: new FormControl(),
      certOfOrigin: new FormControl(),
      exportLiscense: new FormControl(),
      comments: new FormControl()
    });
  }

  newBooking() {
    this.booking = Object.assign({}, this.bookingForm.value);
    this.booking.debug = false;
    this.service.newBooking(this.booking).subscribe(() => {
       console.log('Message Saved Successfully');
       this.alertify.success('Booking generated Successfully');
      }, error => {
        this.alertify.error(error);
        console.log('Message Not Saved Successfully');
      }, () => {
          this.router.navigate(['/dashboard']);
      });
  }

}
