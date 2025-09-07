import { Routes } from '@angular/router';
import { Logicandproofs } from './pages/logicandproofs/logicandproofs';
import { Numtheoryxcrypt } from './pages/numtheoryxcrypt/numtheoryxcrypt';
import { Graphtheory } from './pages/graphtheory/graphtheory';
import { Counting } from './pages/counting/counting';
import { Basicstructures } from './pages/basicstructures/basicstructures';
import { Relations } from './pages/relations/relations';

export const routes: Routes = [ 
    { path: '', component: Logicandproofs},
    { path: '', component: Numtheoryxcrypt},
    { path: '', component: Graphtheory},
    { path: '', component: Counting},
    { path: '', component: Basicstructures},
    { path: '', component: Relations}
];
