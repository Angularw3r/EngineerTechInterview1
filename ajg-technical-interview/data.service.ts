import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private counter: BehaviorSubject<number>;
  
  constructor() { this.counter = new BehaviorSubject<number>(0) }

  updateCounter(count: number) {
    this.counter.next(count);
  }

  getCounter(): Observable<number> {
    return this.counter.asObservable();
  }

}
