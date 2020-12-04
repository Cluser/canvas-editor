import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-new-image-modal',
  templateUrl: './new-image-modal.component.html',
  styleUrls: ['./new-image-modal.component.scss']
})
export class NewImageModalComponent implements OnInit {

  public newImage = new Subject<void>();

  constructor(public modalRef: BsModalRef) {}

  ngOnInit(): void { }

  public onConfirm(): void {
    this.newImage.next();
    this.modalRef.hide();
  }

  public onCancel(): void {
    this.modalRef.hide();
  }
}
