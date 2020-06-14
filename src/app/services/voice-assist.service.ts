import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Injectable({
  providedIn: 'root',
})
export class VoiceAssistService {
  constructor(private speechRecognition: SpeechRecognition) {}
  getSpeech() {
    let options = {
      language: 'pt-BR',
      matches: 1,
      prompt: 'Ouvindo...',
      showPopup: true,
    };
    return new Promise((resolve, reject) => {
      this.speechRecognition.startListening(options).subscribe(
        (matches) => {
          resolve(matches);
        },
        (onerror) => {
          console.log('error:', onerror);
          reject(onerror);
        }
      );
    });
  }

  identifyRequest(text: string) {
    if (
      (text.includes('farmácia') && text.includes('próxim')) ||
      text.includes('perto')
    )
      return 'farmacia';
  }
}
