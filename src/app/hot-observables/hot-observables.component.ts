import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, observable, Observable, Observer, Subject } from 'rxjs';
import { publish, refCount, share } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  n: number = 0;
  n1: number = 0;
  n2: number = 0;

  s1: string = "";
  s2: string = "";
  myObservable: Observable<number> = new Observable();
  constructor() { }
/**
 * 
 *  para ter a mesma informação nos 2 observables no Cold-observables ele gera dados independentes
 */
  ngOnInit(): void {
    this.myObservable = new Observable(
      (onserver: Observer<number>) => {
        let i: number = 0;
        setInterval(() => {
          i++
          (i == 100) ? onserver.complete : onserver.next(i);
        }, 1000)
      }
    )
   //this.usingSubjects();
    //this.usingPublish();
    this.usingShare();
  }

  /**
   * 
   * Como está sendo dado subject no mesmo observable no 'subject' ele vai gerar a mesma info  
   * 
   */
  usingSubjects(){
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject)
    this.s1='Waiting for interval ..... ';
    //subs1
    setTimeout(() => {
      subject.subscribe((_n)=>{
        this.n1 = _n;
        this.s1 = 'ok';
      })
    }, 2000);
    this.s2='Waiting for interval ..... ';
    //subs2
    setTimeout(() => {
      subject.subscribe((_n)=>{
        this.n2 = _n;
        this.s2 = 'ok';
      })
    }, 4000);
  }

  usingPublish(){
    /**
     * Caso já for dado o complete ele nao retorna mais nada para novos subscribers
     */

    //pipe filtrar as informações que ta vindo(Mais para frente)
    //const multicasted = this.myObservable.pipe( publish(), refCount() );
    const multicasted: ConnectableObservable<number> = this.myObservable.pipe( publish() )as  ConnectableObservable<number>;
    //responsavel por se connectar com os observables
    multicasted.connect();

    this.s1='Waiting for interval ..... ';
     //subs1
     setTimeout(() => {
      multicasted.subscribe((_n)=>{
        this.n1 = _n;
        this.s1 = 'ok';
      })
    }, 2000);
    this.s2='Waiting for interval ..... ';
    //subs2
    setTimeout(() => {
      multicasted.subscribe((_n)=>{
        this.n2 = _n;
        this.s2 = 'ok';
      })
    }, 4000);
  }

  usingShare(){
    /**
     * À partir do primeiro subscribe ele já cria tudo
     * 
     * Se caso já foi dado o complete ele começa de novo a novos subscribe
     */
    const multicasted = this.myObservable.pipe( share() );

    this.s1='Waiting for interval ..... ';
     //subs1
     setTimeout(() => {
      multicasted.subscribe((_n)=>{
        this.n1 = _n;
        this.s1 = 'ok';
      })
    }, 2000);
    this.s2='Waiting for interval ..... ';
    //subs2
    setTimeout(() => {
      multicasted.subscribe((_n)=>{
        this.n2 = _n;
        this.s2 = 'ok';
      })
    }, 4000);
  }

}
