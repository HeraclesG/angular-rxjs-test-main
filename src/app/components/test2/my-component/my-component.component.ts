import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject,from, combineLatest, first, firstValueFrom, forkJoin, map, of, reduce, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  partA = new BehaviorSubject<string>('First-Value');
  partB = new BehaviorSubject<string>('Second-Value');




  //do not alter
  partC = new BehaviorSubject<number[]>([0, 1, -1, 0]);
  //do not alter



  displayText = 'default';

  compositeValue = combineLatest([this.partB, this.partA, this.partC])
    .pipe(
      map(([a, b, c]) => {
      if(this.displayText=='A-IPSUM')
        return `${b}.${a}.${c.reduce((acc, cur) => acc + cur, 0)}`
      return `${a}.${b}.${c}`
    }))

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
  console.log(this.activatedRoute.data);
    //do not remove or relocate
    setTimeout(() => {
      this.partC.next([1, 2, 3, 4])
    }, 4000)
    //do not remove or relocate


    return firstValueFrom(this.activatedRoute.data
      .pipe(
        first(),
        map(({ 0: messageVal }) => ({ display: messageVal })),
        tap(({ display }) => { this.displayText = display; }),
      ))
  }

}
  