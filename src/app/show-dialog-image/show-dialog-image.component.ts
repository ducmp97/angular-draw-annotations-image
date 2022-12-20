import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import domtoimage from 'dom-to-image';
import { MarkerService } from '../event-bus/marker.service';
import * as markerjs2 from 'markerjs2';
import { CustomTableLayout } from 'pdfmake/interfaces';
@Component({
  selector: 'app-show-dialog-image',
  templateUrl: './show-dialog-image.component.html',
  styleUrls: ['./show-dialog-image.component.scss'],
})
export class ShowDialogImageComponent implements OnInit {
  @ViewChild('content') pdfContent: ElementRef | undefined;

  constructor(
    public dialogRef: MatDialogRef<ShowDialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private markerService: MarkerService
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    // let sampleImage: any = document.getElementById('show-image-dialog');
    // this.markerService.marker$.subscribe((marker) => {
    //   console.log('marker', marker);
    //   if (marker) {
    //     // sampleImage.src = '../../assets/image.jpg';
    //     if (sampleImage) {
    //       this.resetmarketArea(sampleImage, marker);
    //     }
    //   }
    // });
  }

  resetmarketArea(target: any, marker: any) {
    if (
      marker &&
      marker !== undefined &&
      JSON.stringify(marker) !== JSON.stringify({})
    ) {
      const markerArea = new markerjs2.MarkerArea(target);
      markerArea.uiStyleSettings.hideToolbar = true;
      markerArea.uiStyleSettings.hideToolbox = true;
      markerArea.settings.disableRotation = true;

      markerArea.addEventListener('render', (event) => {
        console.log('event: ', event.state);

        target.src = event.dataUrl;
      });
      markerArea.show();
      markerArea.restoreState(marker);
      markerArea.startRenderAndClose();
    }
  }

  convertToPdf() {
    const doc = new jsPDF();

    let date = new Date().getTime();

    if (this.pdfContent) {
      const pdfContent = this.pdfContent.nativeElement;
      var html = htmlToPdfmake(pdfContent.innerHTML);
      const documentDefinition = {
        content: html,
        info: {
          title: 'Country Profile',
          author: 'UNESCAP Statistics Division',
        },
        footer: function (currentPage: any, pageCount: any) {
          return currentPage.toString() + ' of ' + pageCount;
        },
      };
      const file = pdfMake.createPdf(documentDefinition);

      console.log('file: ', file);
      // console.log('file blod: ', file.getBlob());

      // file.download('' + date);
      file.open();
    }
  }
}
