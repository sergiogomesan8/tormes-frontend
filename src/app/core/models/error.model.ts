export class HttpError {
  code?: HTTP_ERROR_CODE;
  message: HTTP_ERROR_MESSAGE;

  constructor(message: HTTP_ERROR_MESSAGE, code?: HTTP_ERROR_CODE, ) {
    this.code = code;
    this.message = message;
  }
}

export enum HTTP_ERROR_CODE {
  CONNECTION_REFUSED = 0,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HTTP_ERROR_MESSAGE {
  CONNECTION_REFUSED = 'Connection refused',
  NO_CONTENT = 'No content',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  UNKNOWN_ERROR = 'Unknown error',
}
