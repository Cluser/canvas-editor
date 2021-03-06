import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewImageModalComponent } from './modals/new-image-modal/new-image-modal.component';
import { SaveImageModalComponent } from './modals/save-image-modal/save-image-modal.component';


@NgModule({
  declarations: [
    NewImageModalComponent,
    SaveImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    NewImageModalComponent
  ],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
        ngModule: SharedModule,
        providers: []
    };
 }
}

