import { Routes } from '@angular/router';
import { GraphTestComponent } from './pages/graph-test/graph-test.component';
import { AnnidatedTableComponent } from './pages/annidated-table/annidated-table.component';

export const routes: Routes = [
    {
        path: 'graph',
        component: GraphTestComponent
    },
    {
        path: 'table',
        component: AnnidatedTableComponent
    }
];
