import { Component, OnInit } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {
  subscription1:Subscription= new Subscription;
  subscription2:Subscription= new Subscription;
  n1:number=0;
  n2:number=0;

  s1:string="";
  s2:string="";

  constructor() { }

  ngOnInit(): void {
    this.s1 = 'initializing';
    this.s2 = 'initializing';
    const myFirstObservable = new Observable((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.error("deu um erro")
      observer.complete();
    });

    const myIntervalObservable = new Observable((observer: Observer<any>) => {
      let i: number = 0;
      let id = setInterval(() => {
        i++;
        console.log('fom observable: ' + i);
        if (i == 10) {
          observer.complete();
        } else if (i % 2 == 0) {
          observer.next(i);
        }
      }, 1000);
      return()=>{
        clearInterval(id);
      }
    });

    this.subscription1 = myIntervalObservable.subscribe((_n)=>{
      this.n1 = _n
    },(err)=>{
      this.s1 = 'err: '+err
    },()=>{
      this.s1="completed"
    });
    setInterval(()=>{
      this.subscription2 = myIntervalObservable.subscribe((_n)=>{
        this.n2 = _n
      },(err)=>{
        this.s2 = 'err: '+err
      },()=>{
        this.s2="completed"
      });
    },3000)
    
    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000);
  }

}
