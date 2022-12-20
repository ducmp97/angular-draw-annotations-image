import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from 'jspdf';
import * as markerjs2 from 'markerjs2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { MarkerService } from '../event-bus/marker.service';
@Component({
  selector: 'app-show-dialog-image',
  templateUrl: './show-dialog-image.component.html',
  styleUrls: ['./show-dialog-image.component.scss'],
})
export class ShowDialogImageComponent implements OnInit {
  @ViewChild('content') pdfContent: ElementRef | undefined;
  @ViewChild('image') pdfImage: ElementRef | undefined;
  @ViewChild('header') pdfHeader: ElementRef | undefined;

  htmlContent: any;
  htmlImage: any;
  htmlHeader: any;
  imageBase64: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<ShowDialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private markerService: MarkerService
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    let sampleImage: any = document.getElementById('show-image-dialog');
    this.markerService.marker$.subscribe((marker) => {
      if (marker) {
        if (sampleImage) {
          this.resetmarketArea(sampleImage, marker);
        }
      }
    });
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
        target.src = event.dataUrl;
      });
      markerArea.show();
      markerArea.restoreState(marker);
      markerArea.startRenderAndClose();
    }
  }

  convertToPdf() {
    const doc = new jsPDF();
    const fileName = new Date().getTime();

    if (this.pdfHeader) {
      const pdfHeader = this.pdfHeader.nativeElement;
      this.htmlHeader = htmlToPdfmake(pdfHeader.innerHTML, {
        tableAutoSize: true,
      });
    }

    if (this.pdfContent) {
      const pdfContent = this.pdfContent.nativeElement;
      this.htmlContent = htmlToPdfmake(pdfContent.innerHTML, {
        tableAutoSize: true,
      });
    }

    if (this.pdfImage) {
      const pdfImage = this.pdfImage.nativeElement;
      this.htmlImage = htmlToPdfmake(pdfImage.innerHTML);
    }

    const documentDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      content: [
        ...this.htmlHeader,
        {
          image: this.htmlImage[0].image,
          width: 100,
          height: 100,
        },
        ...this.htmlContent,
      ],
      info: {
        title: 'Checksheet Report',
        author: 'DucMp97',
        creationDate: new Date(),
        subject: 'Checksheet',
      },

      images: {
        avatar: {
          url: this.htmlImage[0].image,
        },
      },
    };
    const file = pdfMake.createPdf(documentDefinition);
    // file.download(`${fileName}.pdf`);
    file.open();
  }
}
