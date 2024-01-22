export class CreateSectionDto {
  name: string;
  image: Blob;

  constructor(name: string, image: Blob) {
    this.name = name;
    this.image = image;
  }
}

export class UpdateSectionDto {
  name?: string;
  image?: Blob;

  constructor(name?: string, image?: Blob) {
    this.name = name;
    this.image = image;
  }
}
