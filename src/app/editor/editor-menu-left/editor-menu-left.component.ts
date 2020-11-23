import { Component, OnInit } from '@angular/core';
import { EditorSharedActionService } from '../editor-shared/editor-shared-action.service';

@Component({
  selector: 'app-editor-menu-left',
  templateUrl: './editor-menu-left.component.html',
  styleUrls: ['./editor-menu-left.component.scss']
})
export class EditorMenuLeftComponent implements OnInit {

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

  public addLine(): void {
    this.editorSharedAction.addLine.next();
  }

  public addText(): void {
    this.editorSharedAction.addText.next();
  }
}
