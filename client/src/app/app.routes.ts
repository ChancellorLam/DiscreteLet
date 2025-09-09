import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LogicPage } from './pages/logic-page/logic-page';
import { BasicStructuresPage } from './pages/basic-structures-page/basic-structures-page';
import { RelationsPage } from './pages/relations-page/relations-page';
import { GraphTheoryPage } from './pages/graph-theory-page/graph-theory-page';
import { CountingPage } from './pages/counting-page/counting-page';
import { NumberTheoryPage } from './pages/number-theory-page/number-theory-page';
import { PrimengTestPage } from './pages/primeng-test-page/primeng-test-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePage, pathMatch: 'full' },
  { path: 'logic', component: LogicPage },
  { path: 'basic-structures', component: BasicStructuresPage },
  { path: 'relations', component: RelationsPage },
  { path: 'graph-theory', component: GraphTheoryPage },
  { path: 'counting', component: CountingPage },
  { path: 'number-theory', component: NumberTheoryPage },
  { path: 'primeng-test-page', component: PrimengTestPage },
];
