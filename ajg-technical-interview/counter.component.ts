import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit, OnDestroy {
  public currentCount: number = 0;
  private subs = new Subscription();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayCounter();
  }

  public incrementCounter() {
    this.currentCount++;
    this.dataService.updateCounter(this.currentCount);
  }

  displayCounter() {
    this.subs.add(
      this.dataService.getCounter().subscribe(c => this.currentCount = c))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
