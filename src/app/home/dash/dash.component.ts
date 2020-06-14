import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {
  listButtons = [
    {
      icon: 'map-outline',
      title: 'Unidades de Saúde',
      description: 'Encontre as mais próximas de você',
      color: '#4A7DFF',
    },
    {
      icon: 'information-circle-outline',
      title: 'Lembretes',
      description: 'Receba lembretes importantes',
      color: '#541DC8',
    },
    {
      icon: 'cloud-outline',
      title: 'Clima Local',
      description: 'Descubra se o clima estará agradável',
      color: '#1DC843',
    },
    {
      icon: 'pin-outline',
      title: 'Sua Rota',
      description: 'Verifique se sua rota está "safe"!',
      color: '#C8651D',
    },
    {
      icon: 'warning-outline',
      title: 'Emergência',
      description: 'Aconteceu algum problema urgente?',
      color: '#FF4A5A',
    },
    {
      icon: 'newspaper-outline',
      title: 'Notícias',
      description: 'Veja as principais notícias ao seu redor',
      color: '#1DC8BE',
    },
  ];
  constructor() {}

  ngOnInit() {
    console.log(this.listButtons);
  }
}
