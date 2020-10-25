import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { EditorSharedActionService } from '../editor-shared/editor-shared-action.service';

@Component({
  selector: 'app-editor-menu-right',
  templateUrl: './editor-menu-right.component.html',
  styleUrls: ['./editor-menu-right.component.scss']
})
export class EditorMenuRightComponent implements OnInit {

  public selectedObject: fabric.Object;

  constructor(private editorSharedActionService: EditorSharedActionService) { }

  ngOnInit(): void {
    this.registerListeners();
  }

  private registerListeners(): void {
    this.objectSelectionListener();
  }

  private objectSelectionListener(): void {
    this.editorSharedActionService.selectObject.subscribe((selection) => {
      if (selection) {
        this.selectedObject = selection.selected[0];
        console.log(this.selectedObject);
      } else {
        this.selectedObject = null;
      }
    });
  }

}
