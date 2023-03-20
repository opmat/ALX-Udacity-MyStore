import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Buffer } from 'buffer'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  fullname: string = '';
  totalPrice: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    let data: string = '';
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const retdata:string = paramMap.get('info')!;
      let data = JSON.parse(Buffer.from(retdata, 'base64').toString('binary'));
      this.fullname = data.fullname;
      this.totalPrice = data.totalPrice;
    });
  }
}
