import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetricsComponent} from './metrics/metrics.component';
import {JvmMemoryComponent} from './metrics/blocks/jvm-memory/jvm-memory.component';
import {JvmThreadsComponent} from './metrics/blocks/jvm-threads/jvm-threads.component';
import {MetricsCacheComponent} from './metrics/blocks/metrics-cache/metrics-cache.component';
import {MetricsDatasourceComponent} from './metrics/blocks/metrics-datasource/metrics-datasource.component';
import {
  MetricsEndpointsRequestsComponent
} from './metrics/blocks/metrics-endpoints-requests/metrics-endpoints-requests.component';
import {
  MetricsGarbageCollectorComponent
} from './metrics/blocks/metrics-garbagecollector/metrics-garbagecollector.component';
import {MetricsModalThreadsComponent} from './metrics/blocks/metrics-modal-threads/metrics-modal-threads.component';
import {MetricsRequestComponent} from './metrics/blocks/metrics-request/metrics-request.component';
import {MetricsSystemComponent} from './metrics/blocks/metrics-system/metrics-system.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbProgressBarModule} from '@nebular/theme';


@NgModule({
  declarations: [
    MetricsComponent,
    JvmMemoryComponent,
    JvmThreadsComponent,
    MetricsCacheComponent,
    MetricsDatasourceComponent,
    MetricsEndpointsRequestsComponent,
    MetricsGarbageCollectorComponent,
    MetricsModalThreadsComponent,
    MetricsRequestComponent,
    MetricsSystemComponent,
  ],
  exports: [
    MetricsComponent,
    JvmMemoryComponent,
    JvmThreadsComponent,
    MetricsCacheComponent,
    MetricsDatasourceComponent,
    MetricsEndpointsRequestsComponent,
    MetricsGarbageCollectorComponent,
    MetricsModalThreadsComponent,
    MetricsRequestComponent,
    MetricsSystemComponent,
  ],
  imports: [
    CommonModule,
    NbProgressBarModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class MetricSharedModule {
}
