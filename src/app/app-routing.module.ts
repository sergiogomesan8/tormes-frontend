import {NgModule} from '@angular/core';
import {RouterModule, type Routes} from '@angular/router';

const routes: Routes = [];

// eslint-disable-next-line new-cap
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
