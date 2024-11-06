import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule from '@angular/material/icon'
import { MatIconRegistry } from '@angular/material/icon'; // Import MatIconRegistry
import { DomSanitizer } from '@angular/platform-browser';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [MatIconModule]
})
export class IconModule { 
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('dashboard',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/reply-arrow-icon.svg'));
  }
}
