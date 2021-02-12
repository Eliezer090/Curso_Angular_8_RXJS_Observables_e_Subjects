import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, observable, Observer, Subject } from 'rxjs';
import { publish } from 'rxjs/operators';
import { DateModel } from './datamodel';

@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {
  public dataObservable: ConnectableObservable<DateModel>;
  
  constructor() { 
    this.dataObservable = new Observable(
      (observer: Observer<DateModel>) =>{
        let n= 0;
        console.log("observable create");
        let f = () => {
          n++;
          if (n<=10){
            console.log(n);
            let timestamp = Math.round(Math.random()*2000+500);
            observer.next({timestamp: timestamp, date:n});
            //chamar a função f até dar 10 dentro do tempo criado no random
            setTimeout(f, timestamp);
          }else{
            console.log('complete');
            observer.complete();
          }
        }
        f();
      }
    ).pipe(publish()) as ConnectableObservable<DateModel>;
  }
}
