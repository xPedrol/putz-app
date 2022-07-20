import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageCropperDialogComponent} from './image-cropper-dialog/image-cropper-dialog.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {NgxDropzoneModule} from "ngx-dropzone";


@NgModule({
  declarations: [
    ImageCropperDialogComponent
  ],
    imports: [
        CommonModule,
        ImageCropperModule,
        NgxDropzoneModule
    ]
})
export class ImageCropperHandleModule {
}
