import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-business',
  templateUrl: './for-business.component.html',
  styleUrls: ['./for-business.component.scss']
})
export class ForBusinessComponent implements OnInit {
  offerings: string[] = [
    'Plataforma para acompanhamento do seu projeto em tempo real',
    'Projetos de vídeos desenvolvido em prazo estabelecido ;',
    'Comunicação Personalizada;',
    'Supreenda-se com nossos limites.',
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
