import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Standalone components are not declared or imported here directly for the module itself to use.
// They are imported directly by the components/modules that use them.
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Import MatTabsModule as it's used by PrinciplePageComponent which was importing SharedModule
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    // No declarations for standalone components
  ],
  imports: [
    CommonModule,
    // Import Angular Material modules that other components might need if they import SharedModule
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  exports: [
    // Export Angular Material modules for other modules/components to use
    CommonModule, // Often useful to re-export
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ]
})
export class SharedModule { }
