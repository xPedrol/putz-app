import {Component, Input, OnInit} from '@angular/core';
import {IProjectRenderItem} from "../../../../../../../../src/app/models/project-render-item.model";

@Component({
  selector: 'app-render-form-voto-lula-detail',
  templateUrl: './render-form-voto-lula-detail.component.html',
  styleUrls: ['./render-form-voto-lula-detail.component.scss']
})
export class RenderFormVotoLulaDetailComponent implements OnInit {

  @Input() hasWhatsapp: boolean = true;
  @Input() isPrecadastro: boolean = true;

  constructor(

  ) {
  }

  ngOnInit(): void {

  }

}
