/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from './http-service.service';
import { HttpParams } from '@angular/common/http';
import {
  HTTP_ERROR_CODE,
  HTTP_ERROR_MESSAGE,
} from '@core/models/error.model';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const dummyData = { hello: 'world' };

    service.get('testUrl').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should perform GET ALL request', () => {
    const dummyData = { hello: 'world' };

    service.getAll('testUrl').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should perform POST request', () => {
    const dummyData = { hello: 'world' };
    const dummyBody = { foo: 'bar' };

    service.post('testUrl', dummyBody).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  });

  it('should perform PUT request', () => {
    const dummyData = { hello: 'world' };
    const dummyBody = { foo: 'bar' };

    service.put('testUrl', dummyBody).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyData);
  });

  it('should perform PATCH request', () => {
    const dummyData = { hello: 'world' };
    const dummyBody = { foo: 'bar' };

    service.patch('testUrl', dummyBody).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyData);
  });

  it('should perform DELETE request', () => {
    const dummyData = { hello: 'world' };

    service.delete('testUrl').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyData);
  });

  it('should create HttpParams correctly', () => {
    const params = { param1: 'value1', param2: 'value2', hideLoader: false };
    const httpParams = service['createParams'](params);
    expect(httpParams instanceof HttpParams).toBeTruthy();
    expect(httpParams.get('param1')).toEqual('value1');
    expect(httpParams.get('param2')).toEqual('value2');
    expect(httpParams.get('hideLoader')).toEqual('false');
  });

  it('should handle response correctly', () => {
    const response = { data: 'test' };
    const handledResponse = service['handleResponse'](response);
    expect(handledResponse).toEqual(response);
  });

  it('should handle different HTTP errors correctly', () => {
    const errorCodes = [
      HTTP_ERROR_CODE.CONNECTION_REFUSED,
      HTTP_ERROR_CODE.NO_CONTENT,
      HTTP_ERROR_CODE.BAD_REQUEST,
      HTTP_ERROR_CODE.UNAUTHORIZED,
      HTTP_ERROR_CODE.FORBIDDEN,
      HTTP_ERROR_CODE.NOT_FOUND,
      HTTP_ERROR_CODE.INTERNAL_SERVER_ERROR,
      -1, // Unknown error
    ];

    errorCodes.forEach((code) => {
      try {
        service['handleError']({ status: code }).subscribe();
      } catch (e) {
        const error = e as Error;
        if (code === -1) {
          expect(error.message).toEqual(HTTP_ERROR_MESSAGE.UNKNOWN_ERROR);
        } else {
          expect((error as any).code).toEqual(code);
        }
      }
    });
  });

  it('should throw error when handleError is given invalid arguments', () => {
    const error = null;
    expect(() => service['handleError'](error as any)).toThrow();
  });
});
