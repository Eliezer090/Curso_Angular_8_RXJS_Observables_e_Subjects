import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-hot-observable-intro',
  templateUrl: './hot-observable-intro.component.html',
  styleUrls: ['./hot-observable-intro.component.css']
})
export class HotObservableIntroComponent implements OnInit {
  @ViewChild('mybutton') button: ElementRef= new ElementRef(this);
  n1:number=0;
  n2:number=0;

  s1:string="";
  s2:string="";
  constructor() { }

  ngOnInit() {
    let myBtnClickObservable: Observable<any>= fromEvent(this.button.nativeElement,'click');
    myBtnClickObservable.subscribe((event)=>{
      console.log('BUTON 1');
    });
    myBtnClickObservable.subscribe((event)=>{
      console.log('BUTON 2');
    });
  }

}
