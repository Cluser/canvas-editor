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
  public fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New',
  'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond',
  'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];

  constructor(private editorSharedActionService: EditorSharedActionService) { }

  ngOnInit(): void {
    this.registerListeners();
  }

  private registerListeners(): void {
    this.objectSelectionListener();
  }

  private objectSelectionListener(): void {
    this.editorSharedActionService.selectObject.subscribe((selectedObject) => {
      selectedObject ? this.selectedObject = selectedObject : this.selectedObject = null;
    });
  }

  private changeProperty(property: any, value: any): void {
    this.selectedObject.set(property, value);
    this.editorSharedActionService.renderCanvas.next();
  }

}
