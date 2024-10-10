import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private initialState = {
    tab: { index: 1, tabName: "selling" },
    users: []
  };

  private stateSubject = new BehaviorSubject<any>(this.initialState);
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
}
