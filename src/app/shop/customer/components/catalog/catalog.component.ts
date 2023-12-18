import {
  Component,
  HostBinding,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CarouselItem } from '@shared/models/carouselItem';
import { Product } from '@shop/models/product';
import { Section } from '@shop/models/section';
import { isPlatformBrowser } from '@angular/common';
import { New } from '@shop/models/new';
import { ProductService } from '@shop/services/product.service';
import { Observable, finalize, of, startWith } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @HostBinding('style.width')
  carouselWidth!: string;

  products: Product[] = [];
  sections: Section[] = sectionsMock;
  news: New[] = newsMock;

  sectionCarouselItems: CarouselItem[] = [];
  newsCarouselItems: CarouselItem[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly productService: ProductService
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.findAllProducts();
    this.sectionCarouselItems = this.sections.map((section) => ({
      src: section.image,
      alt: section.name,
      label: section.name,
      description: '',
    }));
    this.newsCarouselItems = this.news.map((news) => ({
      src: news.image,
      alt: news.name,
      label: news.name,
      description: news.description,
    }));
  }

  findAllProducts() {
    this.productService.findAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.carouselWidth = window.innerWidth <= 576 ? '244px' : '520px';
    }
  }
}

// export const productColumn = [
//   'id', 'name', 'price', 'section'
// ];

export const newsMock: New[] = [
  {
    image: '../assets/images/mural-ibericos-selectos-tormes.jpg',
    name: 'Los mejores productos',
    description:
      'Disfruta de los mejores productos provenientes de la zona del tormes.',
  },
  {
    image: '../assets/images/ganaderia-porcina-campo.png',
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

export const sectionsMock: Section[] = [
  {
    name: 'Example Section',
    image: '../assets/images/embutidos.jpg',
  },
  {
    name: 'Carnes',
    image: '../assets/images/carne.jpg',
  },
  {
    name: 'Quesos',
    image: '../assets/images/quesos-3.jpeg',
  },
  {
    name: 'Fiambres',
    image: '../assets/images/fiambres.jpg',
  },
  {
    name: 'Jamón',
    image: '../assets/images/jamon.jpg',
  },
];

// export const productsMock: Product[] = [
//   {
//     id: 'A000000000',
//     image: '../assets/images/chorizo-iberico-de-bellota.jpg',
//     name: 'Chorizo ibérico de bellota',
//     price: 8.99,
//     section: 'Embutidos',
//   },
//   {
//     id: 'B000000000',
//     image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
//     name: 'Lomo de cebo',
//     price: 5.99,
//     section: 'Embutidos',
//   },
//   {
//     id: 'C000000000',
//     image: '../assets/images/lomo-extra.jpg',
//     name: 'Lomo extra',
//     price: 20.99,
//     section: 'Carnes ',
//   },
//   {
//     id: 'D000000000',
//     image: '../assets/images/salchichón-iberico-de-bellota.jpg',
//     name: 'Slachichón ibérico de bellota',
//     price: 12.99,
//     section: 'Carnes ',
//   },
//   {
//     id: 'A000000001',
//     image: '../assets/images/chorizo-iberico-de-bellota.jpg',
//     name: 'Chorizo ibérico de bellota',
//     price: 8.99,
//     section: 'Quesos',
//   },
//   {
//     id: 'B000000001',
//     image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
//     name: 'Lomo de cebo',
//     price: 5.99,
//     section: 'Quesos',
//   },
//   {
//     id: 'C000000001',
//     image: '../assets/images/lomo-extra.jpg',
//     name: 'Lomo extra',
//     price: 20.99,
//     section: 'Quesos',
//   },
//   {
//     id: 'D000000001',
//     image: '../assets/images/salchichón-iberico-de-bellota.jpg',
//     name: 'Slachichón ibérico de bellota',
//     price: 12.99,
//     section: 'Fiambres',
//   },
//   {
//     id: 'A000000002',
//     image: '../assets/images/chorizo-iberico-de-bellota.jpg',
//     name: 'Chorizo ibérico de bellota',
//     price: 8.99,
//     section: 'Embutidos',
//   },
//   {
//     id: 'B000000002',
//     image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
//     name: 'Lomo de cebo',
//     price: 5.99,
//     section: 'Embutidos',
//   },
//   {
//     id: 'C000000002',
//     image: '../assets/images/lomo-extra.jpg',
//     name: 'Lomo extra',
//     price: 20.99,
//     section: 'Carnes ',
//   },
//   {
//     id: 'D000000002',
//     image: '../assets/images/salchichón-iberico-de-bellota.jpg',
//     name: 'Slachichón ibérico de bellota',
//     price: 12.99,
//     section: 'Carnes ',
//   },
//   {
//     id: 'A000000003',
//     image: '../assets/images/chorizo-iberico-de-bellota.jpg',
//     name: 'Chorizo ibérico de bellota',
//     price: 8.99,
//     section: 'Quesos',
//   },
//   {
//     id: 'B000000003',
//     image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
//     name: 'Lomo de cebo',
//     price: 5.99,
//     section: 'Quesos',
//   },
//   {
//     id: 'C000000003',
//     image: '../assets/images/lomo-extra.jpg',
//     name: 'Lomo extra',
//     price: 20.99,
//     section: 'Quesos',
//   },
//   {
//     id: 'D000000003',
//     image: '../assets/images/salchichón-iberico-de-bellota.jpg',
//     name: 'Slachichón ibérico de bellota',
//     price: 12.99,
//     section: 'Fiambres',
//   },
// ];
