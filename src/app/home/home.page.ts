import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: 'vertical',
  };
  constructor(public router: Router) {}
  goToVoiceAssist() {
    this.router.navigate(['/voice-assist']);
  }
}
