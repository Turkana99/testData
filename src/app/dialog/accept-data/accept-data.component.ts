import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-data',
  templateUrl: './accept-data.component.html',
  styleUrls: ['./accept-data.component.scss']
})
export class AcceptDataComponent implements OnInit{
  visitInfo: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}
  ngOnInit(): void {
    this.visitInfo = this.data.visitInfo;
    console.log(this.visitInfo);
  }
}
