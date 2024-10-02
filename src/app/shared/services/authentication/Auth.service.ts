import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private provider = new GoogleAuthProvider();
constructor(private auth: Auth) { }
signInWithGoogle(): Observable<UserCredential> {
  return from(signInWithPopup(this.auth, this.provider));
}
signOut() {
  return from(this.auth.signOut());
}

}
