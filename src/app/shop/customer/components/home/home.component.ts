import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostBinding,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CarouselItem } from '@shared/models/carouselItem';
import { New } from '@shop/models/new';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @HostBinding('style.width')
  carouselWidth!: string;

  newsCarouselItems: CarouselItem[] = [];
  news: New[] = newsMock;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.onResize();
  }

  ngOnInit(): void {
    this.newsCarouselItems = this.news.map((news) => ({
      src: news.image,
      alt: news.name,
      label: news.name,
      description: news.description,
    }));
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.carouselWidth = window.innerWidth <= 576 ? '244px' : '520px';
    }
  }
}

export const newsMock: New[] = [
  {
    image: '../assets/images/mural-ibericos-selectos-tormes.jpg',
    name: 'Los mejores productos',
    description:
      'Disfruta de los mejores productos provenientes de la zona del tormes.',
  },
  {
    image: '../assets/images/vacasCamino.jpg',
    name: 'Granjas propias',
    description:
      'Criamos y alimentamos a nuestros animales por los valles del Tormes.',
  },
  {
    image: '../assets/images/quesos-1.jpeg',
    name: '¡Nuestro Queso en oferta!',
    description:
      '¡Estas Naviadades, hasta un 50% de descuentos en quesos de la mejor calidad!',
  },
];
