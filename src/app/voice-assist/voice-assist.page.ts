import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-voice-assist',
  templateUrl: './voice-assist.page.html',
  styleUrls: ['./voice-assist.page.scss'],
})
export class VoiceAssistPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}
}
