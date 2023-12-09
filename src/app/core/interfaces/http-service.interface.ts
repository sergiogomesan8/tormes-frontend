import { Observable } from 'rxjs';
export type ParamsType = { hideLoader: boolean };

export interface IHttpService {
  get(url: string, params?: ParamsType): Observable<any>;

  getAll(url: string, params?: ParamsType): Observable<any>;

  post(url: string, data: any, params?: ParamsType): Observable<any>;

  put(url: string, data: any, params?: ParamsType): Observable<any>;

  patch(url: string, data: any, params?: ParamsType): Observable<any>;

  delete(url: string, data?: any, params?: ParamsType): Observable<any>;
}
