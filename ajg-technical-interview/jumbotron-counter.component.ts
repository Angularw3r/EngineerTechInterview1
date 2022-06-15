import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, observable, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-jumbotron-counter',
  templateUrl: './jumbotron-counter.component.html'
})
export class JumbotronCounterComponent implements OnInit {
  public currentCount: number;
  private subs = new Subscription();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayCounter();
  }
  
  displayCounter() {
    this.subs.add(
      this.dataService.getCounter().subscribe(c => this.currentCount = c))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
