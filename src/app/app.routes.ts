import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'principles/:principle',
        loadChildren: () => import('./features/principles/principles.module').then(m => m.PrinciplesModule)
    },
    { path: '**', redirectTo: '' } // Wildcard route for a 404 or redirect to home
];
