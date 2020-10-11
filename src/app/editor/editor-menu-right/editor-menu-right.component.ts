import { Component, OnInit } from '@angular/core';
import { EditorSharedActionService } from '../editor-shared/editor-shared-action.service';

@Component({
  selector: 'app-editor-menu-right',
  templateUrl: './editor-menu-right.component.html',
  styleUrls: ['./editor-menu-right.component.scss']
})
export class EditorMenuRightComponent implements OnInit {

  constructor(private editorSharedActionService: EditorSharedActionService) { }

  ngOnInit(): void {
    this.registerListeners();
  }

  private registerListeners(): void {
    this.editorSharedActionService.selectElement.subscribe((element) => console.log(element));
  }

}
