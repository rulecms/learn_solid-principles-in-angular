# SOLID Principles Tutorial - Angular Application

A professional Angular application demonstrating the SOLID principles of object-oriented design through interactive examples and explanations.

## Overview

This application provides an educational, hands-on approach to understanding the five SOLID principles:

- **S** - Single Responsibility Principle
- **O** - Open/Closed Principle
- **L** - Liskov Substitution Principle
- **I** - Interface Segregation Principle
- **D** - Dependency Inversion Principle

## Features

- 🎨 **Dark Professional Theme**: Built with Angular Material's pink-bluegrey dark theme
- 💻 **Interactive Code Examples**: Side-by-side comparison of bad vs. good implementations
- 🔍 **Syntax Highlighting**: Code snippets with Prism.js highlighting and line numbers
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Lazy Loading**: Optimized performance with lazy-loaded feature modules
- 🧩 **Modular Architecture**: Clean separation of concerns with feature modules

## Technology Stack

- **Angular 19**: Latest Angular framework with standalone components
- **Angular Material**: UI component library for consistent design
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with variables and mixins
- **Prism.js**: Syntax highlighting for code examples
- **RxJS**: Reactive programming for data flow

## Project Structure

```
solid-tutorial/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       └── principles-data.service.ts    # SOLID principles content
│   │   ├── features/
│   │   │   ├── home/
│   │   │   │   └── home.component.ts            # Landing page
│   │   │   └── principles/
│   │   │       ├── principles.module.ts         # Lazy-loaded module
│   │   │       └── components/
│   │   │           ├── principle-page/          # Container for each principle
│   │   │           ├── example-page/            # Generic example display
│   │   │           ├── bad-example.component.ts # Bad practice examples
│   │   │           └── good-example.component.ts # Good practice examples
│   │   └── shared/
│   │       ├── shared.module.ts
│   │       └── components/
│   │           ├── card/                        # Reusable card component
│   │           ├── code-snippet/                # Code display with highlighting
│   │           └── back-button/                 # Navigation component
│   └── styles.scss                              # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (optional, included as dev dependency)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd solid-tutorial
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint the codebase

### Adding New Principles or Examples

To add new content, modify the `PrinciplesDataService` in `src/app/core/services/principles-data.service.ts`. Each principle follows this structure:

```typescript
{
  id: 's',
  name: 'S - Single Responsibility Principle',
  fullName: 'Single Responsibility Principle',
  description: 'Description of the principle',
  howToDemonstrate: 'How we demonstrate it',
  badExample: {
    title: 'Title for bad example',
    description: 'Why this is bad',
    codeSnippets: [{
      code: 'Code string',
      language: 'typescript',
      explanation: 'Explanation',
      highlight: 'Line numbers to highlight'
    }]
  },
  goodExample: {
    // Similar structure
  }
}
```

## SOLID Principles Examples

### 1. Single Responsibility Principle (SRP)
- **Bad**: Component handling both data fetching and display
- **Good**: Component delegating data operations to a service

### 2. Open/Closed Principle (OCP)
- **Bad**: Payment processor with if/else chains for payment types
- **Good**: Strategy pattern with payment strategies

### 3. Liskov Substitution Principle (LSP)
- **Bad**: Subclass throwing errors for base class methods
- **Good**: Subclass maintaining base class contracts

### 4. Interface Segregation Principle (ISP)
- **Bad**: Fat interface forcing unnecessary implementations
- **Good**: Segregated interfaces for specific capabilities

### 5. Dependency Inversion Principle (DIP)
- **Bad**: High-level module depending on concrete implementations
- **Good**: Both depending on abstractions with dependency injection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Best Practices Demonstrated

- **Component Architecture**: Standalone components with clear responsibilities
- **Module Organization**: Feature modules with lazy loading
- **Service Layer**: Centralized data management
- **Type Safety**: Full TypeScript typing throughout
- **Reactive Patterns**: RxJS for asynchronous operations
- **CSS Architecture**: SCSS with component encapsulation
- **Accessibility**: ARIA labels and semantic HTML

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular team for the excellent framework
- Angular Material team for the UI components
- Prism.js for syntax highlighting
- The software engineering community for SOLID principles

## Credits

Created with ❤️ by the [RuleCMS Team](https://rulecms.com)

