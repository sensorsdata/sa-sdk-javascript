import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule, NavigationEnd } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

import sensors from'sa-sdk-javascript';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        sensors.quick("autoTrackSinglePage");
      }
    });

   }

}
