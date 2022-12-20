import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as markerjs2 from 'markerjs2';
import { MarkerService } from '../event-bus/marker.service';
import { ExportImageService } from '../service/export-image.service';
import { ShowDialogImageComponent } from '../show-dialog-image/show-dialog-image.component';

@Component({
  selector: 'app-show-annotation',
  templateUrl: './show-annotation.component.html',
  styleUrls: ['./show-annotation.component.scss'],
})
export class ShowAnnotationComponent implements OnInit {
  imageUrl: any;

  constructor(
    private markerService: MarkerService,
    private exportService: ExportImageService,
    private dialog: MatDialog // private dialogRef: MatDialogRef<ShowDialogImageComponent, any>
  ) {}

  ngOnInit(): void {
    let sampleImage: any = document.getElementById('show-image');
    this.markerService.marker$.subscribe((marker) => {
      if (marker) {
        sampleImage.src = '../../assets/image.jpg';
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
        this.imageUrl = event.dataUrl;
      });
      markerArea.show();
      markerArea.restoreState(marker);
      markerArea.startRenderAndClose();
    }
  }

  exportImage() {
    const imageName = 'name.png';
    const a = this.getFileFromBase64(this.imageUrl, imageName);
    console.log('a:', a);
  }

  getFileFromBase64(string64: string, fileName: string) {
    const trimmedString = string64.replace('data:image/png;base64,', '');
    const imageContent = window.atob(trimmedString);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    const type = 'image/png';
    const blob = new Blob([buffer], { type });
    //download image
    this.downloadImage(blob, fileName);

    return new File([blob], fileName, {
      lastModified: new Date().getTime(),
      type,
    });
  }

  downloadImage(blob: Blob, fileName: string) {
    let a = document.createElement('a');
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  showImage() {
    const dialogRef = this.dialog.open(ShowDialogImageComponent, {
      data: {
        imageUrl: this.imageUrl,
      },
      width: '50vw',
      panelClass: 'full-panel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
