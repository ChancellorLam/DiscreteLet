import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Logicandproofs } from './pages/logicandproofs/logicandproofs';
import { Numtheoryxcrypt } from './pages/numtheoryxcrypt/numtheoryxcrypt';
import { Graphtheory } from './pages/graphtheory/graphtheory';
import { Counting } from './pages/counting/counting';
import { Basicstructures } from './pages/basicstructures/basicstructures';
import { Relations } from './pages/relations/relations';


class HomeContent {}

export const routes: Routes = [ 
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home, pathMatch: 'full' },
    { path: 'logicandproofs', component: Logicandproofs},
    { path: 'numtheoryxcrypt', component: Numtheoryxcrypt},
    { path: 'graphtheory', component: Graphtheory},
    { path: 'counting', component: Counting},
    { path: 'basicstructures', component: Basicstructures},
    { path: 'relations', component: Relations}
];
