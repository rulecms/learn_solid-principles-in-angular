import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrinciplesRoutingModule } from './principles-routing.module';
// ExamplePageComponent, BadExampleComponent, GoodExampleComponent are standalone
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    // Components are standalone, so no declarations here
  ],
  imports: [
    CommonModule,
    PrinciplesRoutingModule,
    SharedModule
  ]
})
export class PrinciplesModule { }
