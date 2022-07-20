import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss']
})
export class ImageCropperDialogComponent implements OnInit {
  @Input() public ratio: number = 3/4;
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

  close(): void {
    if (this.croppedImage) {
      this.activeModal.close(this.croppedImage);
    }
  }

  onSelect(event: any) {
    this.imageFile = event.addedFiles[0];
  }

  onRemove() {
    this.imageFile = undefined;
    this.croppedImage = undefined;
  }
}
