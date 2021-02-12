import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { DateModel } from '../datamodel';
import { GenRandomDataService } from '../gen-random-data.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subject: Subject<DateModel>;
  replaySubject: ReplaySubject<DateModel>;
  assyncSubject: AsyncSubject<DateModel>;
  behaviorSubject:BehaviorSubject<DateModel>;

  constructor(private dataService: GenRandomDataService) { 
    this.subject= new Subject<DateModel>();
    this.replaySubject= new ReplaySubject<DateModel>();
    this.assyncSubject= new AsyncSubject<DateModel>();
    this.behaviorSubject= new BehaviorSubject<DateModel>({timestamp:0, date: 0});
  }

  ngOnInit(): void {
   this.dataService.dataObservable.subscribe(this.subject);
   this.dataService.dataObservable.subscribe(this.replaySubject);
   this.dataService.dataObservable.subscribe(this.assyncSubject);
   this.dataService.dataObservable.subscribe(this.behaviorSubject);
  }

  conect(){
    this.dataService.dataObservable.connect();
  }
}
