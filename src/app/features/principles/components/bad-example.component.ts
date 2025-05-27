import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrinciplesDataService } from '../../../core/services/principles-data.service';
import { ExamplePageComponent, ExampleData } from './example-page/example-page.component'; // Corrected path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bad-example',
  standalone: true,
  imports: [CommonModule, ExamplePageComponent], // Use ExamplePageComponent
  template: '<app-example-page [exampleData]="data"></app-example-page>',
  // No separate SCSS file needed if all styling is handled by ExamplePageComponent
})
export class BadExampleComponent implements OnInit {
  data: ExampleData | undefined;

  constructor(
    private route: ActivatedRoute,
    private principlesDataService: PrinciplesDataService
  ) { }

  ngOnInit(): void {
    // Get the parent route (PrinciplePageComponent) to find current principle ID
    this.route.parent?.paramMap.subscribe(params => {
      const principleId = params.get('principle');
      if (principleId) {
        const principle = this.principlesDataService.getPrincipleById(principleId);
        if (principle && principle.badExample) {
          this.data = principle.badExample;
        }
      }
    });
  }
}
