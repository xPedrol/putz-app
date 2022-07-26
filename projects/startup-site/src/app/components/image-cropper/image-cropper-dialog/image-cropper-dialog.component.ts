import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss']
})
export class ImageCropperDialogComponent implements OnInit {
  @Input() public ratio: number = 3 / 4;
  @Input() public resizeToHeight: number = 539;
  @Input() public resizeToWidth: number = 416;
  imageFile: any;
  croppedImage: any;


  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent | any) {
    this.croppedImage = event.base64;
  }

  close(sendImage = false): void {
    this.croppedImage = sendImage ? this.croppedImage : null;
    this.imageFile = sendImage ? this.imageFile : null;
    this.activeModal.close(this.croppedImage);
  }
}
