import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceAssistPage } from './voice-assist.page';

const routes: Routes = [
  {
    path: '',
    component: VoiceAssistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceAssistPageRoutingModule {}
