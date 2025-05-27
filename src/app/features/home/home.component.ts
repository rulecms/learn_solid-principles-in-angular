import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  solidPrinciples = [
    { name: 'S - Single Responsibility Principle', shortName: 's', summary: 'A class should have only one reason to change.' },
    { name: 'O - Open/Closed Principle', shortName: 'o', summary: 'Software entities should be open for extension, but closed for modification.' },
    { name: 'L - Liskov Substitution Principle', shortName: 'l', summary: 'Subtypes must be substitutable for their base types.' },
    { name: 'I - Interface Segregation Principle', shortName: 'i', summary: 'Clients should not be forced to depend on interfaces they do not use.' },
    { name: 'D - Dependency Inversion Principle', shortName: 'd', summary: 'High-level modules should not depend on low-level modules. Both should depend on abstractions.' }
  ];

  constructor(private router: Router) { }

  navigateToPrinciple(shortName: string) {
    this.router.navigate(['/principles', shortName]);
  }
}
