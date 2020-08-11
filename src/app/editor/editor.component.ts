import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { EditorCanvasComponent } from './editor-canvas/editor-canvas.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(EditorCanvasComponent, {static: false})
  private editorCanvasComponent: EditorCanvasComponent;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  private onKeyPress($event: KeyboardEvent): void {
    if (!($event.shiftKey || $event.metaKey)) {
      switch ($event.key) {
        case 'Delete':
          this.editorCanvasComponent.deleteObjects();
          break;
      }
    }
  }

}
