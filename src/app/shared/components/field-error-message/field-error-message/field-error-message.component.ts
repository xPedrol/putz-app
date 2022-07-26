import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-field-error-message',
  templateUrl: './field-error-message.component.html',
  styleUrls: ['./field-error-message.component.scss']
})
export class FieldErrorMessageComponent implements OnInit {
  @Input() customMessage: string  = 'Campo obrigatório';
  constructor() { }

  ngOnInit(): void {
  }

}
