import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { VoiceAssistService } from '../services/voice-assist.service';
import { PlacesService } from '../services/places.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-voice-assist',
  templateUrl: './voice-assist.page.html',
  styleUrls: ['./voice-assist.page.scss'],
})
export class VoiceAssistPage implements OnInit {
  isRecording = false;
  messages = [];
  myLocation;
  constructor(
    private speechRecognition: SpeechRecognition,
    private _voiceAssist: VoiceAssistService,
    private _places: PlacesService,
    public location: Location
  ) {}

  ngOnInit() {}

  async toggleRecording() {
    const hasPermission = await this.speechRecognition.hasPermission();
    if (hasPermission) {
      this.isRecording = true;
      try {
        const speech = await this._voiceAssist.getSpeech();

        this.isRecording = false;
        this.messages = [];
        this.messages.push({
          text: speech[0],
          button: false,
          me: true,
        });
        let message = this.locateNearby(speech[0]);

        if (message) await this.messageRoutine(message);
      } catch (ex) {}
    } else {
      await this.speechRecognition.requestPermission();
      this.toggleRecording();
    }
  }

  locateNearby(speech: string) {
    speech = speech.toLowerCase();
    if (
      speech.includes('ccr') &&
      (speech.includes('próxim') || speech.includes('perto'))
    ) {
      return {
        title: 'Aqui está alguns postos do CCR por perto',
        name: 'ccr',
      };
    }
    if (
      speech.includes('farmácia') &&
      (speech.includes('próxim') || speech.includes('perto'))
    ) {
      return {
        title: 'Olá, Aqui estão as farmácias mais próximas',
        type: 'pharmacy',
      };
    }
    if (
      (speech.includes('policia') || speech.includes('polícia')) &&
      (speech.includes('próxim') || speech.includes('perto'))
    ) {
      return {
        title: 'Olá, encontrei alguns postos policiais para você',
        type: 'police',
      };
    }

    if (
      speech.includes('posto') &&
      (speech.includes('próxim') || speech.includes('perto'))
    ) {
      return {
        title: 'Olá, Aqui estão os postos de gasolina mais próximos',
        type: 'gas_station',
      };
    }

    if (
      speech.includes('restauran') &&
      (speech.includes('próxim') || speech.includes('perto'))
    ) {
      return {
        title: 'Olá, caso você esteja com fome, poderá ir até um desses locais',
        type: 'restaurant',
      };
    }

    this.messages.push({
      text: 'Desculpe, não entendi, poderia repetir?',
      button: false,
      me: false,
    });
  }

  async messageRoutine(message) {
    await this.timeout(800);
    this.messages.push({
      text: message.title,
      button: false,
      me: false,
    });
    await this._voiceAssist.speaktext(message.title);
    this.messages.push({
      text: '',
      loading: true,
    });

    this.myLocation = await this._places.getMyLocation();

    let nearbyPlaces: any;
    nearbyPlaces = await this._places.getNearbyPlaces(
      this.myLocation.coords,
      message.type,
      message.name
    );

    this.messages.pop();
    if (nearbyPlaces.length > 0) {
      this.messages.push({
        button: nearbyPlaces.slice(0, 5).map((place) => ({
          id: place.id,
          name: place.name,
          location: place.geometry.location,
        })),
        me: false,
      });
    } else {
      const notFound: string = 'Desculpe, não há nenhum local por perto';
      this.messages.push({
        text: notFound,
      });
      await this._voiceAssist.speaktext(notFound);
    }
  }

  async launchMap(location) {
    window.open(
      `https://maps.google.com/?saddr=${this.myLocation.coords.latitude},${this.myLocation.coords.longitude}&daddr=${location.lat},${location.lng}`
    );
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
