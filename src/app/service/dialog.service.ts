import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * The external property to keep dialog reference variable
   *
   * @type {MatDialogRef<{}, any>}
   * @memberof DialogService
   */
  dialogRef: MatDialogRef<{}, any> | undefined;

  /**
   *Creates an instance of DialogService.
   * @param {MatDialog} dialog
   * @memberof DialogService
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Open dialog
   *
   * @template T
   * @param {ComponentType<T>} type
   * @param {*} data
   * @param {Function} callback
   * @param {string} width
   * @memberof DialogService
   */
  openDialog<T extends this>(
    type: ComponentType<T>,
    data: any,
    callback: Function,
    width: string
  ) {
    this.dialogRef = this.dialog.open(type, { width: width, data: data });
    this.dialogRef.afterClosed().subscribe((result) => callback(result));
  }

  openDialogEx<T extends this>(
    type: ComponentType<T>,
    callback: Function,
    config: any
  ) {
    this.dialogRef = this.dialog.open(type, config);
    this.dialogRef.afterClosed().subscribe((result) => callback(result));
  }

  /**
   * Open a dialog in mobile site
   *
   * @template T
   * @param {ComponentType<T>} type
   * @param {Function} [callback=null]
   * @param {*} [data=null]
   * @memberof DialogService
   */
  openMobileDialog<T extends this>(
    type: ComponentType<T>,
    callback: Function,
    data: any = null
  ) {
    this.openDialog(type, data, callback, '95%');
  }

  /**
   * Check mobile browser
   *
   * @private
   * @returns
   * @memberof DialogService
   */
  private isMobileBrowser() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      screen.width <= 480
    ) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Check mobile browser
   *
   * @private
   * @returns
   * @memberof DialogService
   */
  private isIpadBrowser() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Chrome|Fire Fox/i.test(
        navigator.userAgent
      ) &&
      screen.width > 480 &&
      screen.width <= 800
    ) {
      return true;
    } else {
      return false;
    }
  }
}
