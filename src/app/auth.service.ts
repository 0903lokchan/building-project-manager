import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest } from './data_model/loginRequest';
import { User } from './data_model/user';
import { USERS } from './mock_data/mock_users';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly USER_API = '';
	private currentUser: User | undefined;

	constructor () {}

	login (loginRequest: LoginRequest): Observable<User | undefined> {
		// const users = this.getUsers()
		const users = USERS;
		const user = users.filter(
			(user) => user.username === loginRequest.username && user.password === loginRequest.password
		);
		if (user.length == 1) {
			this.currentUser = user[0];
		}
		return of(this.currentUser);
	}

	logout () {
		this.currentUser = undefined;
	}

	isLoggedIn (): boolean {
		return this.currentUser != undefined;
	}

	getCurrentUser$ (): Observable<User | undefined> {
		return of(this.currentUser);
	}

	getUsers (): User[] {
		var users = localStorage.getItem('users');
		if (!users) {
			// TODO http get users
		}
		return users ? JSON.parse(users) : [];
	}
}
