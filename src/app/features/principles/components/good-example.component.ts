import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrinciplesDataService } from '../../../core/services/principles-data.service';
import { ExamplePageComponent, ExampleData } from './example-page/example-page.component'; // Corrected path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-good-example',
  standalone: true,
  imports: [CommonModule, ExamplePageComponent], // Use ExamplePageComponent
  template: '<app-example-page [exampleData]="data"></app-example-page>',
  // No separate SCSS file needed
})
export class GoodExampleComponent implements OnInit {
  data: ExampleData | undefined;

  constructor(
    private route: ActivatedRoute,
    private principlesDataService: PrinciplesDataService
  ) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const principleId = params.get('principle');
      if (principleId) {
        const principle = this.principlesDataService.getPrincipleById(principleId);
        if (principle && principle.goodExample) {
          this.data = principle.goodExample;
        }
      }
    });
  }
}
