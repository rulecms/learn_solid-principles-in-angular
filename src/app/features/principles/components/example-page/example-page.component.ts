import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component'; // Import standalone CodeSnippetComponent
// Principle interface might not be directly needed here if ExampleData is self-sufficient
// import { Principle } from '../../../../core/services/principles-data.service'; 

export interface ExampleCodeSnippet {
  code: string;
  language?: string;
  explanation?: string;
  highlight?: string;
}

export interface ExampleData {
  title?: string;
  description?: string;
  codeSnippets: ExampleCodeSnippet[];
}

@Component({
  selector: 'app-example-page',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent], // Use CodeSnippetComponent directly
  templateUrl: './example-page.component.html',
  styleUrl: './example-page.component.scss' // Corrected to styleUrl
})
export class ExamplePageComponent {
  @Input() exampleData: ExampleData | undefined;
  // We might add inputs for pros/cons or specific highlighted drawbacks later

  constructor() { }
}
