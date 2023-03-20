import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';

import { ToastComponent, ToasterService } from '@coreui/angular';

@Component({
  selector: 'app-my-toast',
  templateUrl: './my-toast.component.html',
  styleUrls: ['./my-toast.component.css'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => MyToastComponent) }]
})
export class MyToastComponent extends ToastComponent {
  @Input() closeButton = true;
  @Input() title = '';
  @Input() content = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }
}
