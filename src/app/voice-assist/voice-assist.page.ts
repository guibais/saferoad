import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-voice-assist',
  templateUrl: './voice-assist.page.html',
  styleUrls: ['./voice-assist.page.scss'],
})
export class VoiceAssistPage implements OnInit {
  private isRecording = false;
  constructor(private speechRecognition: SpeechRecognition) {}

  ngOnInit() {}

  async toggleRecording() {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      const hasPermission = await this.speechRecognition.hasPermission();
      console.log(hasPermission);
    }
  }
}
