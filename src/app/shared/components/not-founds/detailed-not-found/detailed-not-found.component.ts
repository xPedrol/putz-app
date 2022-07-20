import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detailed-not-found',
  templateUrl: './detailed-not-found.component.html',
  styleUrls: ['./detailed-not-found.component.scss']
})
export class DetailedNotFoundComponent implements OnInit {
  @Input() title:string | undefined;
  @Input() message: string | undefined;
  @Input() isAuthenticated: boolean = true;
  @Input() callBack: string[] | undefined;
  @Input() callBackMessage: string | undefined;
  @Input() hasCallback: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.message) {
      this.message = 'O que vc estava procurando não foi encontrado';
    }
    if(!this.title){
      this.title = 'Não encontrado';
    }
  }

}
