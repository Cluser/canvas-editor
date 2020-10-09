import { Component, OnInit } from '@angular/core';
import { EditorSharedActionService } from './../editor-shared/editor-shared-action.service';

@Component({
  selector: 'app-editor-menu-top',
  templateUrl: './editor-menu-top.component.html',
  styleUrls: ['./editor-menu-top.component.scss']
})
export class EditorMenuTopComponent implements OnInit {

  constructor(private editorSharedAction: EditorSharedActionService) { }

  ngOnInit(): void {
  }

  public addRect(): void {
    this.editorSharedAction.addRect.next();
  }

  public addCircle(): void {
    this.editorSharedAction.addCircle.next();
  }

  public addTriangle(): void {
    this.editorSharedAction.addTriangle.next();
  }

}
