import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { LoginRequest } from '../data_model/loginRequest';
import { User } from '../data_model/user';
import { MessageService } from './message.service';
import { USERS } from '../mock_data/mock_users';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private userApi = 'api/users';
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	private readonly storageKey = 'currentUser';
	private currentUser: User | undefined;

	constructor(private http: HttpClient, private messageService: MessageService) { }
	
	// methods to manipulate current user in session storage
	private getCurrentUser(): User {
		return JSON.parse(sessionStorage.getItem(this.storageKey) || "null")
	}

	private setCurrentUser(user: User): void {
		sessionStorage.setItem(this.storageKey, JSON.stringify(user))
	}

	private removeCurrentUser(): void {
		sessionStorage.removeItem(this.storageKey)
	}

	/**
	 * Verifies the login request. If successful, set current user and return an Observable of logged in User.
	 * @param loginRequest Login credentials
	 * @returns User object if login is successful
	 */
	login(loginRequest: LoginRequest): Observable<User> {
		return this.getUsers().pipe(
			map(users => {
				const user = users.filter(
					user => user.LoginName === loginRequest.username && user.Password === loginRequest.password
				);
				if (user.length == 1) {
					this.setCurrentUser(user[0])
					return user[0]
				} else {
					throw new Error("User not found")
				}
			})
		)
	}

	/**
	 * Removes the current User record
	 */
	logout () {
		this.removeCurrentUser()
	}

	/**
	 * Check if the session is logged in.
	 * @returns True if the session is logged in with a valid user
	 */
	isLoggedIn(): boolean {
		return this.getCurrentUser() != null;
	}

	/**
	 * 
	 * @returns An Observable of current User
	 */
	getCurrentUser$ (): Observable<User | undefined> {
		return of(this.getCurrentUser());
	}

	/**
	 * Get a list of all users
	 * @returns An Observable of user list
	 */
	private getUsers(): Observable<User[]> {
		// retrieve from session storage to reduce API calls
		var users = sessionStorage.getItem('users');
		if (users) {
			return of(JSON.parse(users))
		}
		// retrieve from API
		return this.httpGetUserList()
	}

	/**
	 * Deprecated. Fetches a list of all users by XHR calls.
	 * @returns The user list
	 * @deprecated
	 */
	private xhrGetUserList(): User[] {
		var theUrl = 'https://happybuildings.sim.vuw.ac.nz/api/dongpham/user_list.json'
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		
		try {
			return JSON.parse(xmlHttp.responseText).users;
		} catch (error) {
			this.handleError<User[]>('xhrGetUserList')
			return []
		}
	}

	/**
	 * Fetches a list of all users by http service
	 * @returns An Obeservable of user list
	 */
	private httpGetUserList(): Observable<User[]> {
		return this.http
			.get<User[]>(this.userApi)
			.pipe(catchError(this.handleError<User[]>('httpGetUserList', [])));
	}

	/**
	 * General error handling error function. Logs the error and display an error message. Returns a fallback response as provided type.
	 * @param operation Name of error operation
	 * @param result Fallback response
	 * @returns Fallback response as T
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		  console.log(error);
	
		  this.messageService.showErrorMessage(`${operation} failed: ${error.message}`);
	
		  // Go on with empty result
		  return of(result as T);
		};
	  }
	
}
