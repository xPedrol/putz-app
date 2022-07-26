import {Component, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService} from "@nebular/theme";

interface ObjectMap {
  key: string;
  value?: any;
  isObject?: boolean;
}

@Component({
  selector: 'app-object-viewer-dialog',
  templateUrl: './object-viewer-dialog.component.html',
  styleUrls: ['./object-viewer-dialog.component.scss']
})
export class ObjectViewerDialogComponent implements OnInit {
  object: any;
  title: string;
  objectMaps: ObjectMap[];
  suitableTypes = ['string', 'number', 'boolean'];
  isEmpty = false;

  constructor(
    private dialogRef: NbDialogRef<ObjectViewerDialogComponent>,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    if (!this.title) {
      this.title = 'Campos do registro';
    }
    this.setObjectMap();
  }

  close(res: any = {}): void {
    this.dialogRef.close();
  }

  setObjectMap(): void {
    if (this.suitableTypes.includes(typeof this.object)) {
      this.isEmpty = true;
      return;
    }
    if (Array.isArray(this.object)) {
      if (this.object.length === 0) {
        this.isEmpty = true;
        return;
      }
    }
    const objectKeys = Object.keys(this.object);
    if (!objectKeys || objectKeys.length === 0) {
      this.isEmpty = true;
      return;
    }

    this.objectMaps = Object.keys(this.object).map(key => {
      const objectMap: ObjectMap = {key};
      if (this.suitableTypes.some(type => type === (typeof this.object[key]))) {
        objectMap.value = this.object[key];
      } else if ((typeof this.object[key]) !== 'object') {
        objectMap.value = 'Não reconhecido';
      } else {
        objectMap.isObject = true;
        objectMap.value = this.object[key];
      }
      return objectMap;
    });

  }

  openObjectViewerDialog(object: ObjectMap): void {
    if (object) {
      this.dialogService.open(ObjectViewerDialogComponent, {
        context: {
          title: `Campos de ${object.key}`,
          object: object.value
        }
      });
    }
  }
}
