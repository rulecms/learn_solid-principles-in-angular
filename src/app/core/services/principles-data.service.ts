import { Injectable } from '@angular/core';

export interface Principle {
  id: string;
  name: string;
  fullName: string;
  description: string;
  howToDemonstrate: string;
  // Example structure for code snippets - to be fleshed out
  badExample?: { 
    title?: string;
    description?: string;
    codeSnippets: { code: string; language?: string; explanation?: string; highlight?: string }[]; 
  };
  goodExample?: { 
    title?: string;
    description?: string;
    codeSnippets: { code: string; language?: string; explanation?: string; highlight?: string }[]; 
  };
}

@Injectable({
  providedIn: 'root'
})
export class PrinciplesDataService {

  private principlesData: Principle[] = [
    {
      id: 's',
      name: 'S - Single Responsibility Principle',
      fullName: 'Single Responsibility Principle',
      description: 'A class should have only one reason to change. This means a class should only have one job or responsibility.',
      howToDemonstrate: 'We will show a component that handles both data fetching and display logic (violating SRP), and then refactor it into a component that delegates data fetching to a service (adhering to SRP).',
      badExample: {
        title: 'Component Doing Too Much',
        description: 'This component fetches user data and also formats it for display. This violates SRP because it has two responsibilities: data retrieval and data presentation. If the data source changes, or if the display format needs to change, this component will need to be modified.',
        codeSnippets: [
          { 
            code: `
// user-profile.component.ts (Bad Example)
import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  // ... other properties
}

@Component({
  selector: 'app-user-profile-bad',
  template: \`
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <!-- More display logic -->
    </div>
  \`
})
export class UserProfileBadComponent implements OnInit {
  user: User | undefined;

  constructor() { }

  ngOnInit(): void {
    // Simulating fetching data directly within the component
    setTimeout(() => {
      this.user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
      };
    }, 1000);
  }
}
`,
            language: 'typescript',
            explanation: 'The component is responsible for both fetching the user data (simulated with setTimeout) and displaying it. This tight coupling makes the component harder to test and maintain.',
            highlight: '23-32'
          }
        ]
      },
      goodExample: {
        title: 'Component Delegating Data Fetching',
        description: 'This component focuses solely on presenting user data. Data fetching is delegated to a separate service (`UserService`). This adheres to SRP, making the component and service more modular, testable, and maintainable.',
        codeSnippets: [
          {
            code: `
// user.service.ts (Good Example)
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser(id: number): Observable<User> {
    // Simulating an API call
    return of({ id, name: 'Jane Doe', email: 'jane.doe@example.com' }).pipe(delay(1000));
  }
}
`,
            language: 'typescript',
            explanation: 'The `UserService` is responsible only for user-related data operations.',
            highlight: '15-18'
          },
          {
            code: `
// user-profile.component.ts (Good Example)
import { Component, OnInit } from '@angular/core';
import { UserService, User } from './user.service'; 

@Component({
  selector: 'app-user-profile-good',
  template: \`
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
    </div>
  \`
})
export class UserProfileGoodComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(1).subscribe(userData => {
      this.user = userData;
    });
  }
}
`,
            language: 'typescript',
            explanation: 'The component now only handles the presentation of data. It gets the data from `UserService`. If data fetching logic changes, only the service needs an update.',
            highlight: '17,19-21'
          }
        ]
      }
    },
    // ... (O, L, I, D principles will be added here with similar structure)
    {
      id: 'o',
      name: 'O - Open/Closed Principle',
      fullName: 'Open/Closed Principle',
      description: 'Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.',
      howToDemonstrate: 'We will demonstrate a service that uses a series of if/else if statements to handle different payment methods. Then, we will refactor it using a strategy pattern where new payment methods can be added as new classes without modifying the core payment processing logic.',
      badExample: { 
        title: 'Payment Processor with Conditional Logic',
        description: 'This `PaymentProcessor` class uses if/else-if statements to handle different payment types. Adding a new payment type (e.g., Bitcoin) requires modifying this class, violating OCP.',
        codeSnippets: [
          {
            code: `
// payment-processor.service.ts (Bad Example)
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentProcessorBad {
  processPayment(amount: number, type: string): string {
    if (type === 'creditcard') {
      // Complex credit card logic
      return \`Processing credit card payment of \$\${amount}.\`;
    } else if (type === 'paypal') {
      // PayPal specific logic
      return \`Processing PayPal payment of \$\${amount}.\`;
    } else if (type === 'stripe') {
      // Stripe specific logic
      return \`Processing Stripe payment of \$\${amount}.\`;
    } else {
      throw new Error('Unsupported payment type');
    }
  }
}
`,
            language: 'typescript',
            explanation: 'Adding a new payment method requires modifying the `processPayment` method directly.',
            highlight: '6-16'
          }
        ]
      },
      goodExample: {
        title: 'Payment Processor with Strategy Pattern',
        description: 'This approach uses the Strategy pattern. We define an interface `PaymentStrategy`. Each payment method (CreditCard, PayPal, Stripe, Bitcoin) implements this interface. The `PaymentProcessorGood` class now takes a `PaymentStrategy` and uses it, allowing new payment methods to be added without modifying the processor itself.',
        codeSnippets: [
          {
            code: `
// payment-strategy.interface.ts
export interface PaymentStrategy {
  pay(amount: number): string;
}

// concrete-strategies.ts
import { PaymentStrategy } from './payment-strategy.interface';

export class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number): string {
    return \`Processing credit card payment of \$\${amount} via strategy.\`;
  }
}

export class PayPalStrategy implements PaymentStrategy {
  pay(amount: number): string {
    return \`Processing PayPal payment of \$\${amount} via strategy.\`;
  }
}

export class StripeStrategy implements PaymentStrategy {
  pay(amount: number): string {
    return \`Processing Stripe payment of \$\${amount} via strategy.\`;
  }
}

// To add a new payment method, e.g., Bitcoin:
export class BitcoinStrategy implements PaymentStrategy {
  pay(amount: number): string {
    return \`Processing Bitcoin payment of \$\${amount} via strategy.\`;
  }
}
`,
            language: 'typescript',
            explanation: 'Define a common interface and concrete strategy classes for each payment method. New strategies can be added easily.',
            highlight: '2-4, 22-26'
          },
          {
            code: `
// payment-processor.service.ts (Good Example)
import { Injectable } from '@angular/core';
import { PaymentStrategy } from './payment-strategy.interface';

@Injectable({ providedIn: 'root' })
export class PaymentProcessorGood {
  constructor() {}

  process(strategy: PaymentStrategy, amount: number): string {
    return strategy.pay(amount);
  }
}
`,
            language: 'typescript',
            explanation: 'The `PaymentProcessorGood` delegates the payment logic to the provided strategy. It is closed for modification but open for extension by adding new strategy classes.',
            highlight: '8-10'
          },
          {
            code: `
// somewhere-in-your-app.component.ts (Usage Example)
import { Component } from '@angular/core';
import { PaymentProcessorGood } from './payment-processor.service';
import { CreditCardStrategy, PayPalStrategy, BitcoinStrategy } from './concrete-strategies';

@Component({
  selector: 'app-payment-demo',
  template: \`
    <p>{{ creditCardPayment }}</p>
    <p>{{ paypalPayment }}</p>
    <p>{{ bitcoinPayment }}</p>
  \`
})
export class PaymentDemoComponent {
  creditCardPayment: string;
  paypalPayment: string;
  bitcoinPayment: string;

  constructor(private paymentProcessor: PaymentProcessorGood) {
    this.creditCardPayment = this.paymentProcessor.process(new CreditCardStrategy(), 100);
    this.paypalPayment = this.paymentProcessor.process(new PayPalStrategy(), 200);
    this.bitcoinPayment = this.paymentProcessor.process(new BitcoinStrategy(), 50); // Easily use new strategy
  }
}
`,
            language: 'typescript',
            explanation: 'Demonstrates how different strategies can be used with the payment processor.',
            highlight: '19-21'
          }
        ]
      }
    },
    {
      id: 'l',
      name: 'L - Liskov Substitution Principle',
      fullName: 'Liskov Substitution Principle',
      description: 'Subtypes must be substitutable for their base types. This means that client code using a base class reference should not break if a subclass object is passed to it. Subclasses should not change method signatures, pre-conditions (e.g. require more specific input), or post-conditions (e.g. return unexpected types or break invariants) in an incompatible way.',
      howToDemonstrate: 'We will show a base `Employee` class with a `calculateBonus()` method. A `TemporaryEmployee` subclass might override `calculateBonus()` to throw an error (as they are not eligible), violating LSP. The fix involves ensuring subclasses can be used wherever the base class is expected without causing errors or unexpected behavior. This might involve rethinking the hierarchy or method responsibilities.',
      badExample: {
        title: 'Incompatible Subclass Behavior',
        description: 'Here, `TemporaryEmployee` is a subtype of `Employee`. However, it overrides `calculateBonus` to throw an error. If a function expects an `Employee` and tries to calculate a bonus, passing a `TemporaryEmployee` will break the program. This violates LSP.',
        codeSnippets: [
          {
            code: `
// employee.model.ts (Bad Example)
export class Employee {
  constructor(public name: string, public salary: number) {}

  calculateBonus(): number {
    return this.salary * 0.1; // Standard 10% bonus
  }

  getDetails(): string {
    return \`\$\${this.name} - Salary: \$\${this.salary}\`;
  }
}

export class TemporaryEmployee extends Employee {
  constructor(name: string, salary: number) {
    super(name, salary);
  }

  // Overrides with incompatible behavior
  override calculateBonus(): number {
    throw new Error('Temporary employees are not eligible for a bonus.');
  }
}

// bonus-calculator.service.ts (Client code that might break)
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class BonusCalculatorServiceBad {
  calculateEmployeeBonuses(employees: Employee[]): void {
    employees.forEach(employee => {
      try {
        const bonus = employee.calculateBonus();
        console.log(\`\$\${employee.getDetails()}, Bonus: \$\${bonus}\`);
      } catch (error: any) {
        console.error(\`Error calculating bonus for \$\${employee.name}: \$\${error.message}\`);
      }
    });
  }
}
`,
            language: 'typescript',
            explanation: 'The `TemporaryEmployee` subclass throws an error in `calculateBonus`, which is not an expected behavior from the base `Employee` class. Client code relying on `calculateBonus` will break or need special handling for `TemporaryEmployee`.',
            highlight: '17-19, 29-31' // Highlight the overriding method and the catch block in client
          }
        ]
      },
      goodExample: {
        title: 'Substitutable Subclass Behavior',
        description: 'To fix LSP, subclasses must honor the contract of the superclass. `TemporaryEmployee` could return 0 for bonus, or the hierarchy could be redesigned. Here, we make `TemporaryEmployee` return 0, fulfilling the contract that `calculateBonus` returns a number, without breaking client expectations. A more robust redesign might involve an `isEligibleForBonus()` method or separate interfaces like `IBonusEligible`.',
        codeSnippets: [
          {
            code: `
// employee.model.ts (Good Example)
export class Employee {
  constructor(public name: string, public salary: number) {}

  calculateBonus(): number {
    return this.salary * 0.1;
  }

  getDetails(): string {
    return \`\$\${this.name} - Salary: \$\${this.salary}\`;
  }
}

export class PermanentEmployee extends Employee {
  // Inherits calculateBonus as is, or could have specific logic
}

export class TemporaryEmployeeGood extends Employee {
  constructor(name: string, salary: number) {
    super(name, salary);
  }

  // Adheres to LSP: returns a number, fulfilling the contract
  override calculateBonus(): number {
    return 0; // Temporary employees get no bonus
  }
}

export class ContractEmployee extends Employee {
  constructor(name: string, salary: number, public contractBonus: number) {
    super(name, salary);
  }

  override calculateBonus(): number {
    return this.contractBonus; // Contract employees have a fixed bonus
  }
}

// bonus-calculator.service.ts (Client code now works seamlessly)
import { Injectable } from '@angular/core';
import { Employee, TemporaryEmployeeGood, PermanentEmployee, ContractEmployee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class BonusCalculatorServiceGood {
  calculateEmployeeBonuses(employees: Employee[]): void {
    employees.forEach(employee => {
      const bonus = employee.calculateBonus(); // No try-catch needed now
      console.log(\`\$\${employee.getDetails()}, Bonus: \$\${bonus}\`);
    });
  }

  // Example usage
  demo(): void {
    const employees: Employee[] = [
      new PermanentEmployee('Alice', 50000),
      new TemporaryEmployeeGood('Bob', 30000),
      new ContractEmployee('Charlie', 40000, 2000)
    ];
    this.calculateEmployeeBonuses(employees);
  }
}
`,
            language: 'typescript',
            explanation: 'The `TemporaryEmployeeGood` now correctly implements `calculateBonus` by returning 0, satisfying the LSP. Client code can treat all `Employee` subtypes uniformly when calculating bonuses.',
            highlight: '20-22, 41-43' // Highlight the modified calculateBonus and the client code's forEach loop
          }
        ]
      }
    },
    {
      id: 'i',
      name: 'I - Interface Segregation Principle',
      fullName: 'Interface Segregation Principle',
      description: 'Clients should not be forced to depend on interfaces they do not use. This means that large, monolithic interfaces should be split into smaller, more specific ones, so that implementing classes only need to be concerned with the methods that are relevant to them.',
      howToDemonstrate: 'We will define a large `IMachine` interface with methods for `print()`, `scan()`, and `fax()`. A `SimplePrinter` class might only be able to print, but is forced to implement (perhaps with empty methods or by throwing errors) scan and fax methods. We will then segregate `IMachine` into smaller, focused interfaces like `IPrinter`, `IScanner`, `IFaxer`.',
      badExample: { 
        title: 'Monolithic (Fat) Interface',
        description: 'The `IMachine` interface is too broad. A `BasicPrinter` only needs `print()`, but is forced to implement `scan()` and `fax()`, leading to unnecessary or misleading method implementations.',
        codeSnippets: [
          {
            code: `
// machine.interface.ts (Bad Example)
export interface IMachine {
  print(document: any): void;
  scan(document: any): void;
  fax(document: any): void;
}

// basic-printer.service.ts (Bad Example)
import { IMachine } from './machine.interface';

export class BasicPrinter implements IMachine {
  print(document: any): void {
    console.log('Printing document...', document);
  }

  scan(document: any): void {
    // Not applicable, but forced to implement
    throw new Error('Scan not supported by BasicPrinter.');
  }

  fax(document: any): void {
    // Not applicable, but forced to implement
    throw new Error('Fax not supported by BasicPrinter.');
  }
}

// Component using the printer
import { Component } from '@angular/core';
import { BasicPrinter } from './basic-printer.service';

@Component({
  selector: 'app-printer-demo-bad',
  template: '<button (click)="printDoc()">Print</button>'
})
export class PrinterDemoBadComponent {
  private printer = new BasicPrinter();

  printDoc() {
    this.printer.print({ content: 'Hello World' });
    // Calling this.printer.scan() would cause an error.
  }
}
`,
            language: 'typescript',
            explanation: '`BasicPrinter` is forced to implement `scan` and `fax`, even though it doesn\'t support them. This can lead to runtime errors or misleading empty implementations.',
            highlight: '2-6, 13-21' // Highlight the fat interface and the forced implementations
          }
        ]
      },
      goodExample: {
        title: 'Segregated (Role-Specific) Interfaces',
        description: 'The `IMachine` interface is segregated into smaller, more focused interfaces: `IPrinter`, `IScanner`, and `IFaxer`. Classes now only implement the interfaces relevant to their capabilities. `SimplePrinter` implements `IPrinter`, while `MultiFunctionDevice` can implement all three.',
        codeSnippets: [
          {
            code: `
// segregated-machine.interfaces.ts (Good Example)
export interface IPrinter {
  print(document: any): void;
}

export interface IScanner {
  scan(document: any): void;
}

export interface IFaxer {
  fax(document: any): void;
}

// simple-printer.service.ts (Good Example)
import { IPrinter } from './segregated-machine.interfaces';

export class SimplePrinter implements IPrinter {
  print(document: any): void {
    console.log('SimplePrinter: Printing document...', document);
  }
}

// multi-function-device.service.ts (Good Example)
import { IPrinter, IScanner, IFaxer } from './segregated-machine.interfaces';

export class MultiFunctionDevice implements IPrinter, IScanner, IFaxer {
  print(document: any): void {
    console.log('MultiFunctionDevice: Printing document...', document);
  }

  scan(document: any): void {
    console.log('MultiFunctionDevice: Scanning document...', document);
  }

  fax(document: any): void {
    console.log('MultiFunctionDevice: Faxing document...', document);
  }
}
`,
            language: 'typescript',
            explanation: 'Interfaces are now small and focused. `SimplePrinter` only implements `IPrinter`. `MultiFunctionDevice` implements all relevant interfaces.',
            highlight: '2-12, 15-19, 24-36' // Highlight the segregated interfaces and their implementations
          },
          {
            code: `
// Component using the segregated interfaces
import { Component } from '@angular/core';
import { IPrinter, IScanner } from './segregated-machine.interfaces'; // Client depends on the specific interface it needs
import { SimplePrinter } from './simple-printer.service';
import { MultiFunctionDevice } from './multi-function-device.service';

@Component({
  selector: 'app-printer-demo-good',
  template: \`
    <button (click)="testPrinter(mySimplePrinter)">Test Simple Printer</button>
    <button (click)="testPrinter(myMFD)">Test MFD as Printer</button>
    <button (click)="testScanner(myMFD)">Test MFD Scanner</button>
  \`
})
export class PrinterDemoGoodComponent {
  mySimplePrinter: IPrinter = new SimplePrinter();
  myMFD: MultiFunctionDevice = new MultiFunctionDevice(); // Implements IPrinter, IScanner, IFaxer

  // This function only needs an IPrinter
  testPrinter(printer: IPrinter) {
    printer.print({ content: 'Hello from ISP example' });
  }

  // This function could specifically need an IScanner
  testScanner(scanner: IScanner) { // Corrected: scanner: IScanner
    scanner.scan({ content: 'Scan me' });
  }
}
`,
            language: 'typescript',
            explanation: 'Client code can now depend on the smallest possible interface it needs (e.g., `IPrinter`), improving flexibility and reducing coupling. It no longer has access to methods it doesn\'t use.',
            highlight: '3, 15-17, 21-23' // Highlight client depending on IPrinter and specific function signatures
          }
        ]
      }
    },
    {
      id: 'd',
      name: 'D - Dependency Inversion Principle',
      fullName: 'Dependency Inversion Principle',
      description: 'High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces). Furthermore, abstractions should not depend on details; details (concrete implementations) should depend on abstractions.',
      howToDemonstrate: 'A `NotificationComponent` (high-level) directly instantiates and uses a concrete `EmailService` (low-level). We will refactor it so `NotificationComponent` depends on an `INotificationService` interface (abstraction). `EmailService` (and other services like `SMSService`) will implement this interface, and the concrete service will be injected (e.g., via Angular DI), inverting the dependency flow.',
      badExample: { 
        title: 'High-Level Module Depends on Low-Level Module',
        description: 'The `NotificationComponent` (high-level policy) directly creates and uses an instance of `EmailService` (low-level detail). This tight coupling makes it hard to change the notification method (e.g., to SMS) without modifying `NotificationComponent`.',
        codeSnippets: [
          {
            code: `
// email.service.ts (Low-level module - detail)
import { Injectable } from '@angular/core';

// Not providedIn: 'root' to show manual instantiation in bad example
export class EmailService {
  sendEmail(recipient: string, subject: string, body: string): void {
    console.log(\`Email Sent to \$\${recipient} with subject '\$\${subject}': \$\${body}\`);
  }
}

// notification.component.ts (High-level module - policy)
import { Component } from '@angular/core';
import { EmailService } from './email.service'; // Direct dependency on concrete implementation

@Component({
  selector: 'app-notification-bad',
  template: '<button (click)="sendTestNotification()">Send Test Email</button>'
})
export class NotificationBadComponent {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService(); // Direct instantiation
  }

  sendTestNotification(): void {
    this.emailService.sendEmail('test@example.com', 'Test Subject', 'This is a test email.');
  }
}
`,
            language: 'typescript',
            explanation: '`NotificationBadComponent` is tightly coupled to `EmailService`. Changing to a different notification mechanism (e.g., SMS) would require modifying this component.',
            highlight: '12, 19-21, 24' // Highlight import, instantiation, and direct use
          }
        ]
      },
      goodExample: {
        title: 'Both Modules Depend on Abstractions',
        description: 'We introduce an `INotificationService` interface (abstraction). Both `NotificationGoodComponent` (high-level) and concrete services like `EmailServiceGood` and `SmsService` (low-level) depend on this abstraction. Angular\'s DI is used to provide the concrete implementation.',
        codeSnippets: [
          {
            code: `
// notification.service.interface.ts (Abstraction)
export interface INotificationService {
  sendNotification(recipient: string, message: string, subject?: string): void;
}

// email.service.ts (Low-level module - detail, depends on abstraction)
import { Injectable } from '@angular/core';
import { INotificationService } from './notification.service.interface';

@Injectable()
export class EmailServiceGood implements INotificationService {
  sendNotification(recipient: string, message: string, subject: string = 'Notification'): void {
    console.log(\`Email Sent to \$\${recipient} with subject '\$\${subject}': \$\${message}\`);
  }
}

// sms.service.ts (Another low-level module - detail, depends on abstraction)
import { Injectable } from '@angular/core';
import { INotificationService } from './notification.service.interface';

@Injectable()
export class SmsService implements INotificationService {
  sendNotification(recipient: string, message: string): void {
    console.log(\`SMS Sent to \$\${recipient}: \$\${message}\`);
  }
}
`,
            language: 'typescript',
            explanation: 'The `INotificationService` interface defines the abstraction. `EmailServiceGood` and `SmsService` are concrete implementations depending on this abstraction.',
            highlight: '2-4, 10, 19' // Highlight the interface and Implements clauses
          },
          {
            code: `
// notification.component.ts (High-level module - depends on abstraction)
import { Component, Inject } from '@angular/core';
import { INotificationService } from './notification.service.interface';
// Import one of the concrete services for providing it in the component for this example
// In a real app, this would often be provided at a module level or via a token.
import { EmailServiceGood } from './email.service'; 
// import { SmsService } from './sms.service';

@Component({
  selector: 'app-notification-good',
  template: '<button (click)="sendTestNotification()">Send Test Notification</button>',
  // Providing EmailServiceGood here for INotificationService token.
  // A more common pattern is to provide this in an NgModule or a higher-level component.
  providers: [{ provide: 'INotificationService', useClass: EmailServiceGood }]
  // To use SmsService instead, change useClass: SmsService (and import it)
})
export class NotificationGoodComponent {
  constructor(@Inject('INotificationService') private notificationService: INotificationService) {}

  sendTestNotification(): void {
    this.notificationService.sendNotification('test@example.com', 'This is a test notification via DI.', 'Test Subject DIP');
  }
}
`,
            language: 'typescript',
            explanation: '`NotificationGoodComponent` now depends on the `INotificationService` abstraction, not a concrete class. The actual service (Email or SMS) is injected, making the component flexible and decoupled.',
            highlight: '3, 15, 18-20' // Highlight import of abstraction, providers array, constructor injection, and usage
          }
        ]
      }
    }
  ];

  constructor() { }

  getPrinciples(): Principle[] {
    return this.principlesData;
  }

  getPrincipleById(id: string): Principle | undefined {
    return this.principlesData.find(p => p.id === id);
  }
}
