import { Injectable } from '@angular/core';
import { Problem } from '../models/problems.model';
import { PROBLEMS } from '../mock-problem';

@Injectable()
export class DataService {

  constructor() { }

  getProblems(): Problem[]{
    return PROBLEMS;
  }

  getProblem(id: number): Problem {
    return PROBLEMS.find((problem) => problem.id === id);
  }
}
