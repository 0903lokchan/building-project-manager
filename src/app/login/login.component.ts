import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../data_model/loginRequest';
import { User } from '../data_model/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	user: User | undefined;
	loginForm: FormGroup;

	constructor (private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
		this.loginForm = this.formBuilder.group({
			username: [ '' ],
			password: [ '' ]
		});
	}

	ngOnInit (): void {}

	get form () {
		return this.loginForm.controls;
	}

	login () {
		const loginRequest: LoginRequest = {
			username: this.form.username.value,
			password: this.form.password.value
		};

		this.authService.login(loginRequest).subscribe((user) => {
			if (user) {
				this.router.navigate([ 'main' ]);
			}
		});
	}
}
