import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../models/problems.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(problems: Problem[], term: string): Problem[] {
    return problems.filter(
      problem => problem.name.toLowerCase().includes(term)
    );
  }

}
