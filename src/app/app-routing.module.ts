import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DirectoryComponent } from './directory/directory.component';
import { BuildingComponent } from './building/building.component';
import { ProjectComponent } from './project/project.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{
		path: 'main',
		component: MainComponent,
		children: [
			{ path: '', redirectTo: 'directory', pathMatch: 'full' },
			{ path: 'directory', component: DirectoryComponent },
			{ path: 'building', component: BuildingComponent },
			{ path: 'project', component: ProjectComponent }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
