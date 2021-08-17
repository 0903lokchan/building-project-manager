import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DirectoryComponent } from './directory/directory.component';
import { BuildingComponent } from './building/building.component';
import { ProjectComponent } from './project/project.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{
		path: 'main',
		component: MainComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'directory', pathMatch: 'full' },
			{ path: 'directory', component: DirectoryComponent },
			{ path: 'building', component: BuildingComponent },
			{ path: 'project/:id', component: ProjectComponent }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
