import {Component, Input, OnInit} from '@angular/core';
import {IProjectRenderItem} from '../../../../../../../../src/app/models/project-render-item.model';
import {IProjectRenderItemStatus} from '../../../../../../../../src/app/models/enums/project-render-item-status.model';


@Component({
  selector: 'app-render-form-feedback-card',
  templateUrl: './render-form-feedback-card.component.html',
  styleUrls: ['./render-form-feedback-card.component.scss']
})
export class RenderFormFeedbackCardComponent implements OnInit {
  @Input() renderItem: IProjectRenderItem | undefined;
  @Input() renderId: number | undefined;
  @Input() renderItemId: number | undefined;
  @Input() isPreRegistered: boolean | undefined;
  renderStatus = IProjectRenderItemStatus;
  constructor() {
  }

  ngOnInit(): void {
  }

  getStatus(rstatus: IProjectRenderItemStatus): string{
    return IProjectRenderItemStatus[rstatus];
  }

  getWhatsappUrl():string{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return "https://api.whatsapp.com/send/?phone="+this.renderItem?.renderProject?.whatsappBot+"&text=*Quero receber meu vídeo aqui!* Código: c-"+this.renderItem?.renderUid;
    }else{
      // false for not mobile device
      return "https://web.whatsapp.com/send?phone="+this.renderItem?.renderProject?.whatsappBot+"&text=*Quero receber meu vídeo aqui!* Código: c-"+this.renderItem?.renderUid;
    }
  }
}
