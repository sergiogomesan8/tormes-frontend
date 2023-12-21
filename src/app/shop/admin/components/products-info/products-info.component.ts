import { Component, OnInit } from '@angular/core';
import { Product } from '@shop/models/product';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.scss'],
})
export class ProductsInfoComponent implements OnInit {
  products: Product[] = productsMock;

  displayedColumns = productColumn;

  constructor() {}

  ngOnInit() {}
}
export const productColumn = ['id', 'name', 'price', 'section'];
export const productsMock: Product[] = [
  {
    id: 'A000000000',
    image: '../assets/images/chorizo-iberico-de-bellota.jpg',
    name: 'Chorizo ibérico de bellota',
    price: 8.99,
    section: 'Embutidos',
  },
  {
    id: 'B000000000',
    image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
    name: 'Lomo de cebo',
    price: 5.99,
    section: 'Embutidos',
  },
  {
    id: 'C000000000',
    image: '../assets/images/lomo-extra.jpg',
    name: 'Lomo extra',
    price: 20.99,
    section: 'Carnes ',
  },
  {
    id: 'D000000000',
    image: '../assets/images/salchichón-iberico-de-bellota.jpg',
    name: 'Slachichón ibérico de bellota',
    price: 12.99,
    section: 'Carnes ',
  },
  {
    id: 'A000000000',
    image: '../assets/images/chorizo-iberico-de-bellota.jpg',
    name: 'Chorizo ibérico de bellota',
    price: 8.99,
    section: 'Quesos',
  },
  {
    id: 'B000000000',
    image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
    name: 'Lomo de cebo',
    price: 5.99,
    section: 'Quesos',
  },
  {
    id: 'C000000000',
    image: '../assets/images/lomo-extra.jpg',
    name: 'Lomo extra',
    price: 20.99,
    section: 'Quesos',
  },
  {
    id: 'D000000000',
    image: '../assets/images/salchichón-iberico-de-bellota.jpg',
    name: 'Slachichón ibérico de bellota',
    price: 12.99,
    section: 'Fiambres',
  },
  {
    id: 'A000000000',
    image: '../assets/images/chorizo-iberico-de-bellota.jpg',
    name: 'Chorizo ibérico de bellota',
    price: 8.99,
    section: 'Embutidos',
  },
  {
    id: 'B000000000',
    image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
    name: 'Lomo de cebo',
    price: 5.99,
    section: 'Embutidos',
  },
  {
    id: 'C000000000',
    image: '../assets/images/lomo-extra.jpg',
    name: 'Lomo extra',
    price: 20.99,
    section: 'Carnes ',
  },
  {
    id: 'D000000000',
    image: '../assets/images/salchichón-iberico-de-bellota.jpg',
    name: 'Slachichón ibérico de bellota',
    price: 12.99,
    section: 'Carnes ',
  },
  {
    id: 'A000000000',
    image: '../assets/images/chorizo-iberico-de-bellota.jpg',
    name: 'Chorizo ibérico de bellota',
    price: 8.99,
    section: 'Quesos',
  },
  {
    id: 'B000000000',
    image: '../assets/images/lomo-de-cebo-de-campo-50-raza-ibérica.jpg',
    name: 'Lomo de cebo',
    price: 5.99,
    section: 'Quesos',
  },
  {
    id: 'C000000000',
    image: '../assets/images/lomo-extra.jpg',
    name: 'Lomo extra',
    price: 20.99,
    section: 'Quesos',
  },
  {
    id: 'D000000000',
    image: '../assets/images/salchichón-iberico-de-bellota.jpg',
    name: 'Slachichón ibérico de bellota',
    price: 12.99,
    section: 'Fiambres',
  },
];
