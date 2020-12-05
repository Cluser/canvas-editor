import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-save-image-modal',
  templateUrl: './save-image-modal.component.html',
  styleUrls: ['./save-image-modal.component.scss']
})
export class SaveImageModalComponent implements OnInit {

  public onSaveImage = new Subject<string>();
  public imageName: string;

  constructor(public modalRef: BsModalRef) {}

  ngOnInit(): void { }

  public saveImage(): void {
    this.onSaveImage.next(this.imageName);
    this.modalRef.hide();
  }

}
