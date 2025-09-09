import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Logicandproofs } from './pages/logicandproofs/logicandproofs';
import { BasicStructuresPage} from './pages/basic-structures-page/basic-structures-page';
import { Relations } from './pages/relations/relations';
import { GraphTheoryPage } from './pages/graph-theory-page/graph-theory-page';
import { CountingPage } from './pages/counting-page/counting-page';
import { Numtheoryxcrypt } from './pages/numtheoryxcrypt/numtheoryxcrypt';
import { PrimengTestPage } from './pages/primeng-test-page/primeng-test-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePage, pathMatch: 'full' },
  { path: 'logic', component: Logicandproofs },
  { path: 'basic-structures', component: BasicStructuresPage },
  { path: 'relations', component: Relations },
  { path: 'graph-theory', component: GraphTheoryPage },
  { path: 'counting', component: CountingPage },
  { path: 'number-theory', component: Numtheoryxcrypt},
  { path: 'primeng-test-page', component: PrimengTestPage},
];
