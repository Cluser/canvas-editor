import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorSharedActionService {

  public addRect = new Subject<void>();
  public addCircle = new Subject<void>();
  public addTriangle = new Subject<void>();
  public addLine = new Subject<void>();

}
