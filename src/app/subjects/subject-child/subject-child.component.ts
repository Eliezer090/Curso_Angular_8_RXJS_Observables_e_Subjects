import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DateModel } from 'src/app/datamodel';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {
  @Input() subject: Subject<DateModel> = new Subject<DateModel>();
  @Input() name: string = "";

  log: string[] = [];
  connected: boolean = false;
  subscription: Subscription = new Subscription;
  constructor() { }

  ngOnInit(): void {
  }
  logData(data: DateModel) {
    this.log.push("Timestamp: " + data.timestamp + "Data: " + data.date);
  }
  connect() {
    this.log.push("Conected");
    this.connected = true;
    this.subscription = this.subject.subscribe(
      (data: DateModel) => {
        this.logData(data);
      },
      (error) => { this.connected = false },
      () => {
        this.connected = false;
        this.log.push("Finished");
      }
    );
  }
  disconnect() {
    this.log.push("Disconnected");
    this.connected = false;
  }
}
