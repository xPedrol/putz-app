import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat/chat.component';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [
    // NbCustomMessageService
  ]
})
export class ChatMessageModule {
}
