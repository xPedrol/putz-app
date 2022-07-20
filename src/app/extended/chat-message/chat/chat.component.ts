import {Component, OnInit} from '@angular/core';
import {NbChatComponent, NbStatusService} from '@nebular/theme';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends NbChatComponent implements OnInit {

  constructor(
    public statusService: NbStatusService
  ) {
    super(statusService);
  }

  ngOnInit(): void {
  }

}
