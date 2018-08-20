import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problems.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[] = [];
  subscriptionProblems: Subscription;
  constructor(@Inject('data') private data) { }

  ngOnInit() {
    this.getProblems();
  }

  // ngOnDestory() {
  //   this.subscriptionProblems.unsubscribe();
  // }

  getProblems(): void {
    this.subscriptionProblems = this.data.getProblems()
      .subscribe(problems => this.problems = problems);
  }
}
