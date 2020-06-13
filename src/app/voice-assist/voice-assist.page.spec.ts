import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoiceAssistPage } from './voice-assist.page';

describe('VoiceAssistPage', () => {
  let component: VoiceAssistPage;
  let fixture: ComponentFixture<VoiceAssistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceAssistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceAssistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
