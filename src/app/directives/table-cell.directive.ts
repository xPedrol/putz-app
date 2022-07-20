import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[libTableCell]'
})
export class TableCellDirective {
  name: string | undefined;
  displayed: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input() set libTableCell(name: string) {
    this.name = name;
    this.createEmbeddedView();
    this.displayed = true;
  }

  setView(condition: boolean): void {
    if (condition && !this.displayed) {
      this.createEmbeddedView();
    } else if (!condition && this.displayed) {
      this.viewContainer.clear();
    }
  }

  createEmbeddedView(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
