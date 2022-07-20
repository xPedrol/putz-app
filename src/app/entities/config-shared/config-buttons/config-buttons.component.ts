import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigButtonsService} from "../../../services/config/config-buttons.service";
import {Subject, takeUntil} from "rxjs";
import {NbToastrService} from "@nebular/theme";

interface IButton {
  title: string;
  id: number;
  data: any;
  apiUrl: string;
  status?: string;
  successCallback?: string;
  errorCallback?: string;
}

@Component({
  selector: 'app-config-buttons',
  templateUrl: './config-buttons.component.html',
  styleUrls: ['./config-buttons.component.scss']
})

export class ConfigButtonsComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;
  buttons: IButton[] = [
    {
      title: 'Limpar disco (Samba)',
      id: 0,
      data: null,
      apiUrl: 'projects/renders/clear/samba-localvideos',
      successCallback: 'Disco limpo com sucesso',
      errorCallback: 'Falha ao limpar disco'
    }
  ]

  constructor(
    private configButtonsService: ConfigButtonsService,
    private toastService: NbToastrService
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
  }

  sendButtonRequest(button: IButton): void {
    this.configButtonsService.query(button.apiUrl).pipe(takeUntil(this.subject$)).subscribe(
      {
        next: () => {
          this.toastService.show('', button.successCallback, {status: 'success'});
        },
        error: () => {
         // this.toastService.show('', button.errorCallback, {status: 'danger'});
        }
      })
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
