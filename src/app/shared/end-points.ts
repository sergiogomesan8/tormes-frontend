import { environment } from '@env';

class EndPoint {
  constructor(private base: string) {}

  buildUrl(path: string) {
    return this.base + path;
  }
}

export class AuthEndPoint extends EndPoint {
  constructor() {
    super(environment.tormes_backend_api + '/auth');
  }

  REGISTER = this.buildUrl('/register');
  LOGIN = this.buildUrl('/login');
  REFRESH_TOKEN = this.buildUrl('/refresh-token');
}

export class ProductEndPoint extends EndPoint {
  constructor() {
    super(environment.tormes_backend_api + '/product');
  }

  FIND_BY_ID = this.buildUrl('/');
  FIND_ALL = this.buildUrl('/list');
  UPDATE = this.buildUrl('/');
  DELETE = this.buildUrl('/');
  ADD = this.buildUrl('/');
}
