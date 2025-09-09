import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Logicandproofs } from './pages/logicandproofs/logicandproofs';
import { BasicStructuresPage} from './pages/basic-structures-page/basic-structures-page';
import { Relations } from './pages/relations/relations';
import { Graphtheory } from './pages/graphtheory/graphtheory';
import { Counting } from './pages/counting/counting';
import { Numtheoryxcrypt } from './pages/numtheoryxcrypt/numtheoryxcrypt';
import { PrimengTestPage } from './pages/primeng-test-page/primeng-test-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: 'logic', component: Logicandproofs },
  { path: 'basic-structures-page', component: BasicStructuresPage },
  { path: 'relations', component: Relations },
  { path: 'graph-theory', component: Graphtheory },
  { path: 'counting', component: Counting},
  { path: 'number-theory', component: Numtheoryxcrypt},
  { path: 'primeng-test-page', component: PrimengTestPage},
];
