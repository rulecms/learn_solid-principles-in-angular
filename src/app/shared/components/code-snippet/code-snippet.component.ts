import { Component, Input, ViewEncapsulation, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import Prism from 'prismjs';
// Import languages - ensure these are the correct paths from 'prismjs/components'
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markup'; // For HTML, XML, SVG etc.
// Import line numbers plugin if you want to use it later
// import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Import Prism plugins JS
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
  encapsulation: ViewEncapsulation.None // To allow global PrismJS styles if used later
})
export class CodeSnippetComponent implements AfterViewInit, OnChanges {
  @Input() code: string = '';
  @Input() language: string = 'typescript'; // Default language
  @Input() explanation?: string;
  @Input() highlightLines?: string; // For line highlighting plugin - uncommented

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['code'] || changes['language'] || changes['highlightLines']) && 
        (changes['code'] ? !changes['code'].firstChange : true) &&
        (changes['language'] ? !changes['language'].firstChange : true) &&
        (changes['highlightLines'] ? !changes['highlightLines'].firstChange : true)
      ) {
      // Defer to allow view to update with new input values if necessary
      setTimeout(() => this.highlight(), 0);
    }
  }

  ngAfterViewInit() {
    this.highlight();
  }

  private highlight() {
    const preElement = this.el.nativeElement.querySelector('pre');
    const codeElement = this.el.nativeElement.querySelector('code');

    if (codeElement && preElement) {
      if (this.code) {
        // Add line-numbers class for the plugin to work
        preElement.classList.add('line-numbers');

        if (this.highlightLines) {
          preElement.setAttribute('data-line', this.highlightLines);
        } else {
          preElement.removeAttribute('data-line');
        }

        if (Prism.languages[this.language]) {
          codeElement.textContent = this.code; 
          Prism.highlightElement(codeElement);
        } else {
          console.warn(`Prism language '${this.language}' not loaded. Using markup as fallback.`);
          codeElement.textContent = this.code;
          // Attempt to highlight with markup as a fallback, or just show plain text
          if (Prism.languages['markup']) {
              Prism.highlightElement(codeElement);
          } 
        }
      } else {
        codeElement.textContent = ''; // Clear if code is empty
        preElement.removeAttribute('data-line');
        // Optionally remove line-numbers class if code is empty
        // preElement.classList.remove('line-numbers'); 
      }
    } else if (codeElement && !this.code) {
        codeElement.textContent = ''; // Clear if code is empty
    }
  }
}
