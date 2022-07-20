import {Component, OnInit} from '@angular/core';
import {Bean, PropertySource} from '../../../models/configuration.model';
import {ConfigurationService} from '../../../services/config/configuration.service';
import {NbRouteTab} from "@nebular/theme";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {



  tabs: NbRouteTab[] = [
    {
      title: 'Tabelas',
      icon: 'list-outline',
      route: './tables',
    },
    {
      title: 'Configurações Gerais',
      icon: 'settings-2-outline',
      route: './buttons',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }



}
