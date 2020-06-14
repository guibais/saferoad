import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { VoiceAssistService } from '../services/voice-assist.service';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-voice-assist',
  templateUrl: './voice-assist.page.html',
  styleUrls: ['./voice-assist.page.scss'],
})
export class VoiceAssistPage implements OnInit {
  isRecording = false;
  messages = [];
  constructor(
    private speechRecognition: SpeechRecognition,
    private _voiceAssist: VoiceAssistService,
    private _places: PlacesService
  ) {}

  ngOnInit() {}

  async toggleRecording() {
    const hasPermission = await this.speechRecognition.hasPermission();
    if (hasPermission) {
      this.isRecording = true;
      try {
        const speech = await this._voiceAssist.getSpeech();
        this.isRecording = false;
        this.messages.push({
          text: speech[0],
          me: true,
        });
        const request = this._voiceAssist.identifyRequest(speech[0]);
        if (request == 'farmacia') {
          this.messages.push({
            text: 'Olá, Aqui estão as farmácias mais próximas',
            me: false,
          });
          const myLocation = await this._places.getMyLocation();
          await this._places.getNearbyPlaces(myLocation.coords, 'pharmacy');
        }
      } catch (ex) {}
    } else {
      await this.speechRecognition.requestPermission();
      this.toggleRecording();
    }
  }
}
