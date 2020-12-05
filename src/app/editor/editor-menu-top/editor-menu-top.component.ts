import { Component, OnInit } from '@angular/core';
import { EditorSharedActionService } from './../editor-shared/editor-shared-action.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NewImageModalComponent } from 'src/app/shared/modals/new-image-modal/new-image-modal.component';
import { SaveImageModalComponent } from 'src/app/shared/modals/save-image-modal/save-image-modal.component';

@Component({
  selector: 'app-editor-menu-top',
  templateUrl: './editor-menu-top.component.html',
  styleUrls: ['./editor-menu-top.component.scss']
})
export class EditorMenuTopComponent implements OnInit {

  private modalRef: BsModalRef;

  constructor(private editorSharedAction: EditorSharedActionService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  public openNewImageModal(): void {
    this.modalRef = this.modalService.show(NewImageModalComponent);
    this.modalRef.content.onNewImage.subscribe(() => this.clearCanvas());
  }

  public openSaveImageModal(): void {
    this.modalRef = this.modalService.show(SaveImageModalComponent);
    this.modalRef.content.onSaveImage.subscribe((name) => this.saveCanvas(name));
  }

  public clearCanvas(): void {
    this.editorSharedAction.clearCanvas.next();
  }

  public saveCanvas(name: string): void {
    this.editorSharedAction.saveCanvas.next(name);
  }

}
