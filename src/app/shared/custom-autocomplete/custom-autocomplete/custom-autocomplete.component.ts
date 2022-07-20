import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbAutocompleteComponent} from '@nebular/theme';

@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.scss']
})
export class CustomAutocompleteComponent extends NbAutocompleteComponent<any> implements OnInit,AfterViewInit {

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.cd.detectChanges()
  }

}
