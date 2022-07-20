import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PutzSmlBrazilContractComponent } from './putz-sml-brazil-contract/putz-sml-brazil-contract.component';
import {NbButtonModule} from '@nebular/theme';
import {PipeModule} from '../../core/pipes/pipe.module';



@NgModule({
    declarations: [
        PutzSmlBrazilContractComponent
    ],
    exports: [
        PutzSmlBrazilContractComponent
    ],
    imports: [
        CommonModule,
        NbButtonModule,
        PipeModule
    ]
})
export class PutzContractsModule { }
