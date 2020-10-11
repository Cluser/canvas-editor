import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class EditorSharedActionService {

  public addRect = new Subject<void>();
  public addCircle = new Subject<void>();
  public addTriangle = new Subject<void>();
  public addLine = new Subject<void>();
  public addText = new Subject<void>();

  public selectElement = new Subject<fabric.Object>();

}
