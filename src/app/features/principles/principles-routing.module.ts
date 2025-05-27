import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrinciplePageComponent } from './components/principle-page/principle-page.component';
import { BadExampleComponent } from './components/bad-example.component';
import { GoodExampleComponent } from './components/good-example.component';

const routes: Routes = [
  {
    path: '',
    component: PrinciplePageComponent,
    children: [
      { path: 'bad-example', component: BadExampleComponent },
      { path: 'good-example', component: GoodExampleComponent },
      { path: '', redirectTo: 'bad-example', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrinciplesRoutingModule { }
