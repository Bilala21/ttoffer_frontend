import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AppState {
  tab: { index: number; tabName: string };
  users: any[]; // You may want to define a specific type for users
  isLoggedInd: any;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private initialState: AppState = {
    tab: { index: 1, tabName: "selling" },
    users: [],
    isLoggedInd: false
  };

  private stateSubject = new BehaviorSubject<AppState>(this.initialState);
  currentState = this.stateSubject.asObservable();

  constructor() { }

  updateTab(index: number, tabName: string) {
    const currentState = this.stateSubject.value;
    const newState = {
      ...currentState,
      tab: { index, tabName }
    };
    this.stateSubject.next(newState);
  }

  // Method to show the auth modal
  showAuthModal(isAtuthicated: boolean) {
    console.log(isAtuthicated, "isAtuthicated");
    this.updateState({ isLoggedInd: isAtuthicated });
  }

  // Method to hide the auth modal
  hideAuthModal() {
    this.updateState({ isLoggedInd: false });
  }

  // Generic method to update state properties
  private updateState(newState: Partial<AppState>) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...newState });
  }
}
