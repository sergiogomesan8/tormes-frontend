import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IHttpService, ParamsType } from '../interfaces/http-service.interface';
import {
  HttpError,
  HTTP_ERROR_CODE,
  HTTP_ERROR_MESSAGE,
} from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements IHttpService {
  constructor(private http: HttpClient) {}

  get(url: string, params?: ParamsType | undefined): Observable<any> {
    return this.http.get(url, { params: this.createParams(params) }).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }
  getAll(url: string, params?: ParamsType | undefined): Observable<any> {
    return this.http.get(url, { params: this.createParams(params) }).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }
  post(
    url: string,
    body: any,
    params?: ParamsType | undefined
  ): Observable<any> {
    return this.http
      .post(url, body, { params: this.createParams(params) })
      .pipe(
        map((response) => this.handleResponse(response)),
        catchError((error) => this.handleError(error))
      );
  }

  put(
    url: string,
    body: any,
    params?: ParamsType | undefined
  ): Observable<any> {
    return this.http.put(url, body, { params: this.createParams(params) }).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  patch(
    url: string,
    body: any,
    params?: ParamsType | undefined
  ): Observable<any> {
    return this.http
      .patch(url, body, { params: this.createParams(params) })
      .pipe(
        map((response) => this.handleResponse(response)),
        catchError((error) => this.handleError(error))
      );
  }

  delete(
    url: string,
    body?: any,
    params?: ParamsType | undefined
  ): Observable<any> {
    return this.http.delete(url, { params: this.createParams(params) }).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  private createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }

  private handleResponse(response: any): any {
    console.log('response', response);
  }

  private handleError(error: any): Observable<HttpError>  {
    let errorToReturn: HttpError;

    if (error.status === HTTP_ERROR_CODE.CONNECTION_REFUSED) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.CONNECTION_REFUSED,
        HTTP_ERROR_CODE.CONNECTION_REFUSED
      );
      return throwError(() => errorToReturn);
    }
    if (error.status === HTTP_ERROR_CODE.NO_CONTENT) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.NO_CONTENT,
        HTTP_ERROR_CODE.NO_CONTENT
      );
      return throwError(() => errorToReturn);
    }
    if (error.status === HTTP_ERROR_CODE.BAD_REQUEST) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.BAD_REQUEST,
        HTTP_ERROR_CODE.BAD_REQUEST
      );
      return throwError(() => errorToReturn);
    }
    if (error.status === HTTP_ERROR_CODE.UNAUTHORIZED) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.UNAUTHORIZED,
        HTTP_ERROR_CODE.UNAUTHORIZED
      );
      return throwError(() => errorToReturn);
    }
    if (error.status === HTTP_ERROR_CODE.FORBIDDEN) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.FORBIDDEN,
        HTTP_ERROR_CODE.FORBIDDEN
      );
      return throwError(() => errorToReturn);
    }
    if (error.status === HTTP_ERROR_CODE.NOT_FOUND) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.NOT_FOUND,
        HTTP_ERROR_CODE.NOT_FOUND
      );
      return throwError(() => errorToReturn);
    }
    if (error.status === HTTP_ERROR_CODE.INTERNAL_SERVER_ERROR) {
      errorToReturn = new HttpError(
        HTTP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        HTTP_ERROR_CODE.INTERNAL_SERVER_ERROR
      );
      return throwError(() => errorToReturn);
    }

    errorToReturn = new HttpError(HTTP_ERROR_MESSAGE.UNKNOWN_ERROR);
    return throwError(() => errorToReturn);
  }
}
