import {Component, OnInit} from '@angular/core';
import {Bean, PropertySource} from "../../../models/configuration.model";
import {ConfigurationService} from "../../../services/config/configuration.service";

@Component({
  selector: 'app-config-tables',
  templateUrl: './config-tables.component.html',
  styleUrls: ['./config-tables.component.scss']
})
export class ConfigTablesComponent implements OnInit {
  allBeans!: Bean[];
  beans: Bean[] = [];
  beansFilter = '';
  beansAscending = false;
  propertySources: PropertySource[] = [];

  constructor(private configurationService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.configurationService.getBeans().subscribe((beans: Bean[]) => {
      this.allBeans = beans;
      this.filterAndSortBeans();
    });
    this.configurationService.getPropertySources().subscribe((propertySources: any) => (this.propertySources = propertySources));
  }

  filterAndSortBeans(): void {
    this.beansAscending = !this.beansAscending;
    const beansAscendingValue = this.beansAscending ? -1 : 1;
    const beansAscendingValueReverse = this.beansAscending ? 1 : -1;
    this.beans = this.allBeans
      .filter(bean => !this.beansFilter || bean.prefix.toLowerCase().includes(this.beansFilter.toLowerCase()))
      .sort((a, b) => (a.prefix < b.prefix ? beansAscendingValue : beansAscendingValueReverse));
  }
}
