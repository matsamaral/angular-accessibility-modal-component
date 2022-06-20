import { Component, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fade } from './shared/animations/fade';
import { ModalRef } from './shared/components/modal/models/modal-ref';
import { ModalService } from './shared/components/modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})
export class AppComponent implements OnInit {
  @ViewChild('modal') public modalTemplateRef: TemplateRef<any>;

  public modalRef: ModalRef;
  public form: FormGroup;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['Mateus', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      info: [false]
    });
  }

  public show(): void {
    this.modalRef = this.modalService.open({
      title: 'User Details',
      templateRef: this.modalTemplateRef
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.modalRef.close();
  }

}
