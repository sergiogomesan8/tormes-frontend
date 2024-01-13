import { Component, Input } from '@angular/core';
import { CarouselItem } from '@shared/models/carouselItem';

@Component({
  selector: 'carousel-component',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input()
  carouselWidth: string = '';

  @Input()
  carouselItems: CarouselItem[] = [];
}
