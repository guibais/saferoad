import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoiceAssistPageRoutingModule } from './voice-assist-routing.module';

import { VoiceAssistPage } from './voice-assist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiceAssistPageRoutingModule
  ],
  declarations: [VoiceAssistPage]
})
export class VoiceAssistPageModule {}
