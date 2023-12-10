import { Component, Input, OnInit } from '@angular/core';
import { CarouselItem } from '@shared/models/carouselItem';

@Component({
  selector: 'carousel-component',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input()
  carouselWidth: string = '';

  @Input()
  carouselItems: CarouselItem[] = [];

  constructor() {}

  ngOnInit() {}
}
