import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {

  @Input() totalCount? : number;
  @Input() pageSize? : number;

  @Output() myEvent = new EventEmitter();
  onPageChanges(event : any){
    this.myEvent.emit(event)
  }
  

}
