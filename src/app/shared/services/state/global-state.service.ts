import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AppState {
  tab: { index: number; tabName: string };
  users: any[]; // You might want to define a specific user type here
  categories: any[];
  subCategories: any[];
  filteredProducts: any[];
  isLoggedInd: boolean;
  wishListItems: number[]; // Assuming wishlist items are identified by their IDs
  currentUser: any
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private initialState: AppState = {
    tab: { index: 1, tabName: "selling" },
    users: [],
    categories: [],
    isLoggedInd: false,
    wishListItems: [],
    currentUser: {},
    subCategories: [],
    filteredProducts: []
  };

  private stateSubject = new BehaviorSubject<AppState>(this.initialState);
  currentState = this.stateSubject.asObservable();

  constructor() {
    const currentUser = JSON.parse(localStorage.getItem("key") || '{}');
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, currentUser: currentUser });
  }

  updateTab(index: number, tabName: string) {
    const currentState = this.stateSubject.value;
    const newState = {
      ...currentState,
      tab: { index, tabName }
    };
    this.stateSubject.next(newState);
  }

  // Method to toggle the wishlist item
  wishlistToggle(id: number) {
    const currentState = this.stateSubject.value;
    const currentWishList = currentState.wishListItems;
    let newWishList: number[];
    if (currentWishList.includes(id)) {
      newWishList = currentWishList.filter(itemId => itemId !== id);
    } else {
      newWishList = [...currentWishList, id];
    }

    const newState = {
      ...currentState,
      wishListItems: newWishList
    };
    this.stateSubject.next(newState);
  }

  setFilteredProducts(data: any) {
    const currentState = this.stateSubject.value;
    const newState = {
      ...currentState,
      filteredProducts: data
    };
    this.stateSubject.next(newState);
  }
  setCategories(data: any) {
    console.log(data, "setCategories state");
    const currentState = this.stateSubject.value;
    const newState = {
      ...currentState,
      categories: data
    };
    this.stateSubject.next(newState);
  }
  setSubCategories(data: any) {
    const currentState = this.stateSubject.value;
    const newState = {
      ...currentState,
      subCategories: data
    };
    this.stateSubject.next(newState);
  }

  // Method to show the auth modal
  showAuthModal(isAuthenticated: boolean) {
    this.updateState({ isLoggedInd: isAuthenticated });
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
