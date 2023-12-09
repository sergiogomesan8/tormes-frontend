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

export class CustomerEndPoint extends EndPoint {
  constructor() {
    super(environment.tormesBackend + '/customer');
  }

  GET_ALL = this.buildUrl('/getAll');
  GET_ONE = this.buildUrl('/getOne');
}