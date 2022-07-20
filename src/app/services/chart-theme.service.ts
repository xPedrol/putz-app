import {Injectable} from '@angular/core';
import {ThemeService} from "ng2-charts";
import {ChartOptions} from "chart.js";

type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ChartThemeService {

  private _selectedTheme: Theme = 'light-theme';
  public get selectedTheme() {
    return this._selectedTheme;
  }

  public set selectedTheme(value) {
    this._selectedTheme = value;
    let overrides: ChartOptions;
    if (this.selectedTheme === 'dark-theme') {
      overrides = {
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#2e3a59'
            },
            ticks: {
              color: 'white'
            },
          },
          y: {
            grid: {
              color: '#2e3a59'
            },
            ticks: {
              color: 'white'
            },
          },
        }
      };
    } else {
      overrides = {};
    }
    this.themeService.setColorschemesOptions(overrides);
  }

  constructor(private themeService: ThemeService) {
  }

  setCurrentTheme(theme: Theme) {
    this.selectedTheme = theme;
  }
}
