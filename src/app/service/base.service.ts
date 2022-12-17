import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

/**
 * The base service which will extend by all service
 *
 * @export
 * @class BaseService
 */

export class BaseService {
  protected http: HttpClient;
  protected serviceUrl: string;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this.serviceUrl = `http://localhost:8080`;
  }

  /**
   * Get method
   * @param url
   * @param options
   * @param functionCallBack
   * @param pointer
   */
  public get(
    url: string,
    options?: any,
    functionCallBack?: any,
    pointer?: any
  ) {
    this.http
      .get<any>(url, options)
      .subscribe((response) => functionCallBack(response, pointer));
  }

  /**
   * Post method
   *
   * @param {*} url
   * @param {*} obj
   * @param {*} [options]
   * @param {*} [functionCallBack]
   * @param {*} [pointer]
   * @memberof BaseService
   */
  public post(
    url: string,
    obj: any,
    options?: any,
    functionCallBack?: any,
    pointer?: any
  ) {
    this.http
      .post<any>(url, obj, options)
      .subscribe((response) => functionCallBack(response, pointer));
  }

  /**
   * Put method
   *
   * @param {*} url
   * @param {*} obj
   * @param {*} functionCallBack
   * @memberof BaseService
   */
  public put(url: string, obj: any, functionCallBack: any) {
    this.http
      .put<any>(url, obj)
      .subscribe((response) => functionCallBack(response));
  }
}
