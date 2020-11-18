import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { EditorCanvasComponent } from './editor-canvas/editor-canvas.component';
import { MoveObjectEnum } from './../shared/enums/move-object-enum';
import { EditorSharedActionService } from './editor-shared/editor-shared-action.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(EditorCanvasComponent, {static: false})
  private editorCanvasComponent: EditorCanvasComponent;

  constructor(private editorSharedActionService: EditorSharedActionService) { }

  ngOnInit(): void {
  }

  // Hotkeys handling
  @HostListener('window:keydown', ['$event'])
  private onKeyPress($event: KeyboardEvent): void {
    if (!($event.shiftKey || $event.metaKey)) {
      switch ($event.key) {
        case 'ArrowLeft':
          this.editorCanvasComponent.moveObjects(MoveObjectEnum.left);
          break;
        case 'ArrowRight':
          this.editorCanvasComponent.moveObjects(MoveObjectEnum.right);
          break;
        case 'ArrowUp':
          this.editorCanvasComponent.moveObjects(MoveObjectEnum.up);
          break;
        case 'ArrowDown':
          this.editorCanvasComponent.moveObjects(MoveObjectEnum.down);
          break;
        case 'Delete':
          this.editorCanvasComponent.deleteObjects();
          break;
      }
    }

    if ($event.ctrlKey || $event.metaKey) {
      $event.preventDefault();
      switch ($event.key) {
        case 'a':
          this.editorCanvasComponent.selectAll();
          break;
        case 'c':
          this.editorCanvasComponent.copyObjects();
          break;
        case 'v':
          this.editorCanvasComponent.pasteObjects();
          break;
      }
    }
  }

}
