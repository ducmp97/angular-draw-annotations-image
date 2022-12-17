import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpCommonService {
  public readonly methods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
  };

  // For interceptor annotation
  private countLoading: number = 0;

  static httpHeaders = new HttpHeaders();
  constructor(private readonly http: HttpClient) {}

  /**
   *
   *
   * @private
   * @returns {HttpHeaders}
   * @memberof CommonService
   */
  public buildHttpHeaders(): HttpHeaders {
    return new HttpHeaders();
    // put commom headers if any
  }

  /**
   *
   *
   * @private
   * @param {*} params
   * @returns {HttpParams}
   * @memberof CommonService
   */
  public convertHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        const value = params[key] ? params[key].toString() : '';
        if (params.hasOwnProperty(key) && value) {
          httpParams = httpParams.append(key, value);
        }
      }
    }
    return httpParams;
  }

  /**
   *
   *
   * @param {string} url
   * @param {object} [params]
   * @returns
   * @memberof CommonService
   */
  public httpGet<T>(url: string, params?: object): Observable<T> {
    const httpHeaders = this.buildHttpHeaders();
    const param = this.convertHttpParams(params);
    return this.http
      .get<T>(url, { headers: httpHeaders, params: param })
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} data
   * @returns
   * @memberof CommonService
   */
  public httpPost<T>(url: string, data: any): Observable<T> {
    const httpHeaders = this.buildHttpHeaders();
    return this.http
      .post<T>(url, data || null, { headers: httpHeaders })
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} data
   * @returns
   * @memberof CommonService
   */
  public httpPut<T>(url: string, data: any): Observable<T> {
    const httpHeaders = this.buildHttpHeaders();
    return this.http
      .put<T>(url, data || null, { headers: httpHeaders })
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   *
   *
   * @param {string} url
   * @returns
   * @memberof CommonService
   */
  public httpDelete<T>(url: string, params?: object): Observable<T> {
    const httpHeaders = new HttpHeaders();
    const param = this.convertHttpParams(params);
    return this.http
      .delete<T>(url, { headers: httpHeaders, params: param })
      .pipe(catchError((err) => throwError(err)));
  }

  // For interceptor --------------------------
  hasLoading() {
    return this.countLoading > 0;
  }

  showLoading() {
    setTimeout(() => {
      this.countLoading += 1;
    }, 50);
  }

  hidleLoading() {
    // avoid blinking
    setTimeout(() => (this.countLoading -= 1), 200);
  }
  // For interceptor --------------------------
}
