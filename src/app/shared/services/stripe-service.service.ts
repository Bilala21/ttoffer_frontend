import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {
  
  private apiUrl = 'https://www.ttoffer.com/';
  private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {
    this.initStripe();
  }

  private async initStripe() {
    this.stripe = await loadStripe('pk_test_51PZehdRp8Vcq4D6bi1HEniPgkPluHHZftNgeONrtcYRrsR0bs4GN6xSEnrBzE76rze7bTA63a3KecIwnO28ebJnJ00lTSTShq9');
  }

  public getStripe() {
    return this.stripe;
  }

  public processPayment(token: any, amount: number) {
    let input={
      amount:amount,
      currency:'PKR',
      token:token,
    }
    return this.http.post(`${this.apiUrl}` + 'api/charge', input);
  }
  // private stripePromise: Promise<Stripe | null>;

  // constructor(
  //   private http: HttpClient,
  // ) { 
  //   this.stripePromise = loadStripe('your-publishable-key');
  // }

  // getStripe() {
  //   return this.stripePromise;
  // } 
  // createPaymentIntent(amount: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/create-payment-intent`, { amount });
  // }
}
