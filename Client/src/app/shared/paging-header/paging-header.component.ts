import { Component, Input } from '@angular/core';
import { ShopParams } from '../models/shopParams';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.css']
})
export class PagingHeaderComponent {
  @Input() totalCount? : number;
  @Input() pageNumber? : number;
  @Input() pageSize? : number;
}
