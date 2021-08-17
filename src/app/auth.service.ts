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
	private readonly storageKey = 'currentUser';
	private currentUser: User | undefined;

	constructor() { }
	
	private getUser(): User {
		return JSON.parse(sessionStorage.getItem(this.storageKey) || "null")
	}


	private setUser(user: User): void {
		sessionStorage.setItem(this.storageKey, JSON.stringify(user))
	}

	private removeUser(): void {
		sessionStorage.removeItem(this.storageKey)
	}

	login (loginRequest: LoginRequest): boolean {
		const users: User[] = this.getUsers()
		const user = users.filter(
			(user) => user.LoginName === loginRequest.username && user.Password === loginRequest.password
		);
		if (user.length == 1) {
			this.setUser(user[0])
			return true;
		}
		return false;
	}

	logout () {
		this.removeUser()
	}

	isLoggedIn (): boolean {
		return this.getUser != null;
	}

	getCurrentUser$ (): Observable<User | undefined> {
		return of(this.getUser());
	}

	getUsers(): User[] {
		// retrieve from local storage
		var users = localStorage.getItem('users');
		if (users) {
			return JSON.parse(users)
		}
		// retrieve from API
		users = this.httpGetUserList();
		try {
			return JSON.parse(users).users;
		} catch (error) {
			// if anything happens, return empty list
			return []
		}
	}

	httpGetUserList(){
		var theUrl = 'https://happybuildings.sim.vuw.ac.nz/api/dongpham/user_list.json'
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		
		return xmlHttp.responseText;
		}
}
