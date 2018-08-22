import { Routes, RouterModule} from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "problems",
    pathMatch: "full"
  },{
    path: "problems",
    component: ProblemListComponent
  },{
    path: 'problems/:id',
    component: ProblemDetailComponent
  },{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'callback',
    component: CallbackComponent
  },{
    path: "**",
    redirectTo: 'problems'
  }
];

export const routing = RouterModule.forRoot(routes);
