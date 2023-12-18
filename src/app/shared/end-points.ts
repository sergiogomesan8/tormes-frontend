import { environment } from '@env';

class EndPoint {
  constructor(private base: string) {}

  buildUrl(path: string) {
    return this.base + path;
  }
}

export class AuthEndPoint extends EndPoint {
  constructor() {
    super(environment.tormesBackend + '/auth');
  }

  REGISTER = this.buildUrl('/register');
  LOGIN = this.buildUrl('/login');
}

export class ProductEndPoint extends EndPoint {
  constructor() {
    super(environment.tormesBackend + '/product');
  }

  FIND_ALL = this.buildUrl('/list');
}