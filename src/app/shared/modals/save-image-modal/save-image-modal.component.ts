import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-save-image-modal',
  templateUrl: './save-image-modal.component.html',
  styleUrls: ['./save-image-modal.component.scss']
})
export class SaveImageModalComponent implements OnInit {

  public saveImage = new Subject<void>();

  constructor(public modalRef: BsModalRef) {}

  ngOnInit(): void { }

  public onConfirm(): void {
    this.saveImage.next();
    this.modalRef.hide();
  }

  public onCancel(): void {
    this.modalRef.hide();
  }
}
