import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrinciplesDataService, Principle } from '../../../../core/services/principles-data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-principle-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    BackButtonComponent
  ],
  templateUrl: './principle-page.component.html',
  styleUrl: './principle-page.component.scss'
})
export class PrinciplePageComponent implements OnInit {
  principle: Principle | undefined;
  currentPrincipleId: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private principlesDataService: PrinciplesDataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const principleId = params.get('principle');
      if (principleId) {
        this.currentPrincipleId = principleId;
        this.principle = this.principlesDataService.getPrincipleById(principleId);
        if (!this.principle) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  navigateToExample(type: 'bad-example' | 'good-example'): void {
    this.router.navigate([type], { relativeTo: this.route });
  }
}
