import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-voice-assist',
  templateUrl: './voice-assist.page.html',
  styleUrls: ['./voice-assist.page.scss'],
})
export class VoiceAssistPage implements OnInit {
  isRecording = false;
  messages = [
    {
      text: 'Onde eu posso parar meu caminhão?',
      me: true,
    },
    {
      text: 'Olá João! Você pode parar no posto de gasolina mais próximo.',
      me: false,
    },
    {
      text: 'Gostaria de ver as informações?',
      me: false,
    },
  ];
  constructor(private speechRecognition: SpeechRecognition) {}

  ngOnInit() {}

  async toggleRecording() {
    const hasPermission = await this.speechRecognition.hasPermission();
    if (hasPermission) {
      this.isRecording = true;
      let options = {
        language: 'pt-BR',
        matches: 1,
        prompt: 'Ouvindo...',
        showPopup: true,
      };
      this.speechRecognition.startListening(options).subscribe(
        (matches: string[]) => {
          console.log(matches);
          this.isRecording = false;
        },
        (onerror) => {
          console.log('error:', onerror);
          this.isRecording = false;
        }
      );
    } else {
      const askPermission = await this.speechRecognition.requestPermission();
      this.toggleRecording();
    }
  }
}
