export class CreateProductDto {
  name: string;
  section: string;
  price: number;
  description: string;
  image: Blob;

  constructor(
    name: string,
    section: string,
    price: number,
    description: string,
    image: Blob
  ) {
    this.name = name;
    this.section = section;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

export class UpdateProductDto {
  name?: string;
  section?: string;
  price?: number;
  description?: string;
  image?: Blob;

  constructor(
    name?: string,
    section?: string,
    price?: number,
    description?: string,
    image?: Blob
  ) {
    this.name = name;
    this.section = section;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
